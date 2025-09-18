import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface SecurityContextType {
  // Rate limiting
  attemptCount: number;
  lastAttemptTime: number;
  isRateLimited: boolean;
  rateLimitMessage: string;
  
  // Honeypot
  honeypotValue: string;
  isHoneypotTriggered: boolean;
  
  // Behavioral analysis
  mouseMovements: number;
  keystrokes: number;
  timeOnPage: number;
  isHumanBehavior: boolean;
  behaviorScore: number;
  
  // Progressive difficulty
  difficultyLevel: number;
  maxDifficulty: number;
  
  // Security actions
  trackMouseMovement: () => void;
  trackKeystroke: () => void;
  checkHoneypot: (value: string) => boolean;
  incrementAttempts: () => void;
  resetSecurity: () => void;
  getSecurityStatus: () => {
    isSecure: boolean;
    warnings: string[];
    score: number;
  };
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  // Rate limiting state
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  
  // Honeypot state
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isHoneypotTriggered, setIsHoneypotTriggered] = useState(false);
  
  // Behavioral analysis state
  const [mouseMovements, setMouseMovements] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [isHumanBehavior, setIsHumanBehavior] = useState(false);
  const [behaviorScore, setBehaviorScore] = useState(0);
  
  // Progressive difficulty state
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [maxDifficulty] = useState(5);
  
  // Refs for tracking
  const startTimeRef = useRef<number>(Date.now());
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();
  const keystrokeTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Rate limiting configuration
  const RATE_LIMITS = {
    1: { maxAttempts: 5, windowMs: 60000 }, // 5 attempts per minute
    2: { maxAttempts: 3, windowMs: 60000 }, // 3 attempts per minute
    3: { maxAttempts: 2, windowMs: 120000 }, // 2 attempts per 2 minutes
    4: { maxAttempts: 1, windowMs: 300000 }, // 1 attempt per 5 minutes
    5: { maxAttempts: 1, windowMs: 600000 }, // 1 attempt per 10 minutes
  };
  
  // Initialize honeypot with random value
  useEffect(() => {
    const randomValue = Math.random().toString(36).substring(7);
    setHoneypotValue(randomValue);
  }, []);
  
  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(Date.now() - startTimeRef.current);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mouse movement tracking
  const trackMouseMovement = useCallback(() => {
    setMouseMovements(prev => prev + 1);
    
    // Clear existing timeout
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    
    // Set new timeout to detect rapid movements (bot behavior)
    mouseTimeoutRef.current = setTimeout(() => {
      // Check for suspicious patterns
      if (mouseMovements > 100 && timeOnPage < 5000) {
        setBehaviorScore(prev => Math.max(0, prev - 10));
      }
    }, 1000);
  }, [mouseMovements, timeOnPage]);
  
  // Keystroke tracking
  const trackKeystroke = useCallback(() => {
    setKeystrokes(prev => prev + 1);
    
    // Clear existing timeout
    if (keystrokeTimeoutRef.current) {
      clearTimeout(keystrokeTimeoutRef.current);
    }
    
    // Set new timeout to detect rapid keystrokes (bot behavior)
    keystrokeTimeoutRef.current = setTimeout(() => {
      // Check for suspicious patterns
      if (keystrokes > 50 && timeOnPage < 3000) {
        setBehaviorScore(prev => Math.max(0, prev - 5));
      }
    }, 500);
  }, [keystrokes, timeOnPage]);
  
  // Honeypot check
  const checkHoneypot = useCallback((value: string) => {
    // If the field has been filled (not empty and not the original honeypot value), it's a bot
    if (value && value !== '' && value !== honeypotValue) {
      setIsHoneypotTriggered(true);
      return false; // Bot detected
    }
    return true; // Human behavior
  }, [honeypotValue]);
  
  // Increment attempts and check rate limiting
  const incrementAttempts = useCallback(() => {
    const now = Date.now();
    const limit = RATE_LIMITS[difficultyLevel as keyof typeof RATE_LIMITS];
    
    // Reset attempts if window has passed
    if (now - lastAttemptTime > limit.windowMs) {
      setAttemptCount(1);
    } else {
      setAttemptCount(prev => prev + 1);
    }
    
    setLastAttemptTime(now);
    
    // Check if rate limited
    if (attemptCount >= limit.maxAttempts) {
      setIsRateLimited(true);
      const remainingTime = Math.ceil((limit.windowMs - (now - lastAttemptTime)) / 1000);
      setRateLimitMessage(`Too many attempts. Please wait ${remainingTime} seconds before trying again.`);
      
      // Increase difficulty for next time
      if (difficultyLevel < maxDifficulty) {
        setDifficultyLevel(prev => prev + 1);
      }
    } else {
      setIsRateLimited(false);
      setRateLimitMessage('');
    }
  }, [attemptCount, lastAttemptTime, difficultyLevel, maxDifficulty]);
  
  // Reset security state
  const resetSecurity = useCallback(() => {
    setAttemptCount(0);
    setLastAttemptTime(0);
    setIsRateLimited(false);
    setRateLimitMessage('');
    setIsHoneypotTriggered(false);
    setMouseMovements(0);
    setKeystrokes(0);
    setTimeOnPage(0);
    setBehaviorScore(0);
    setDifficultyLevel(1);
    startTimeRef.current = Date.now();
  }, []);
  
  // Calculate behavior score
  useEffect(() => {
    let score = 0;
    
    // Time on page (minimum 10 seconds for human behavior)
    if (timeOnPage > 10000) score += 20;
    else if (timeOnPage > 5000) score += 10;
    
    // Mouse movements (should be present for human behavior)
    if (mouseMovements > 5) score += 15;
    else if (mouseMovements > 0) score += 5;
    
    // Keystrokes (should be present for form filling)
    if (keystrokes > 10) score += 15;
    else if (keystrokes > 0) score += 5;
    
    // Interaction patterns
    if (mouseMovements > 0 && keystrokes > 0) score += 10;
    
    // Penalize suspicious patterns
    if (mouseMovements > 100 && timeOnPage < 5000) score -= 20; // Too many movements too quickly
    if (keystrokes > 50 && timeOnPage < 3000) score -= 15; // Too many keystrokes too quickly
    
    setBehaviorScore(Math.max(0, Math.min(100, score)));
    setIsHumanBehavior(score >= 30);
  }, [timeOnPage, mouseMovements, keystrokes]);
  
  // Get overall security status
  const getSecurityStatus = useCallback(() => {
    const warnings: string[] = [];
    let score = 100;
    
    // Rate limiting check
    if (isRateLimited) {
      warnings.push(rateLimitMessage);
      score -= 50;
    }
    
    // Honeypot check
    if (isHoneypotTriggered) {
      warnings.push('Suspicious activity detected');
      score -= 100;
    }
    
    // Behavior check
    if (!isHumanBehavior && timeOnPage > 5000) {
      warnings.push('Unusual behavior detected');
      score -= 20;
    }
    
    // Difficulty level penalty
    if (difficultyLevel > 1) {
      warnings.push(`Security level increased due to repeated attempts`);
      score -= (difficultyLevel - 1) * 10;
    }
    
    return {
      isSecure: score >= 50 && !isHoneypotTriggered && !isRateLimited,
      warnings,
      score: Math.max(0, score)
    };
  }, [isRateLimited, rateLimitMessage, isHoneypotTriggered, isHumanBehavior, timeOnPage, difficultyLevel]);
  
  const value: SecurityContextType = {
    attemptCount,
    lastAttemptTime,
    isRateLimited,
    rateLimitMessage,
    honeypotValue,
    isHoneypotTriggered,
    mouseMovements,
    keystrokes,
    timeOnPage,
    isHumanBehavior,
    behaviorScore,
    difficultyLevel,
    maxDifficulty,
    trackMouseMovement,
    trackKeystroke,
    checkHoneypot,
    incrementAttempts,
    resetSecurity,
    getSecurityStatus,
  };
  
  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
