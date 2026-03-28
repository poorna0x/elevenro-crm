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
  /** Milliseconds since tracking started; does not trigger global re-renders every second */
  getTimeOnPage: () => number;
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
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');

  const [honeypotValue, setHoneypotValue] = useState('');
  const [isHoneypotTriggered, setIsHoneypotTriggered] = useState(false);

  const [mouseMovements, setMouseMovements] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [isHumanBehavior, setIsHumanBehavior] = useState(false);
  const [behaviorScore, setBehaviorScore] = useState(0);

  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [maxDifficulty] = useState(5);

  const startTimeRef = useRef<number>(Date.now());
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();
  const keystrokeTimeoutRef = useRef<NodeJS.Timeout>();
  const mouseMovementsRef = useRef(0);
  const keystrokesRef = useRef(0);

  mouseMovementsRef.current = mouseMovements;
  keystrokesRef.current = keystrokes;

  const getTimeOnPage = useCallback(() => Date.now() - startTimeRef.current, []);

  const RATE_LIMITS = {
    1: { maxAttempts: 5, windowMs: 60000 },
    2: { maxAttempts: 3, windowMs: 60000 },
    3: { maxAttempts: 2, windowMs: 120000 },
    4: { maxAttempts: 1, windowMs: 300000 },
    5: { maxAttempts: 1, windowMs: 600000 },
  };

  useEffect(() => {
    const randomValue = Math.random().toString(36).substring(7);
    setHoneypotValue(randomValue);
  }, []);

  // Recalculate behavior from elapsed time + latest interaction counts without 1s global setState
  useEffect(() => {
    const recalc = () => {
      const timeOnPage = Date.now() - startTimeRef.current;
      const m = mouseMovementsRef.current;
      const k = keystrokesRef.current;
      let score = 0;

      if (timeOnPage > 10000) score += 20;
      else if (timeOnPage > 5000) score += 10;

      if (m > 5) score += 15;
      else if (m > 0) score += 5;

      if (k > 10) score += 15;
      else if (k > 0) score += 5;

      if (m > 0 && k > 0) score += 10;

      if (m > 100 && timeOnPage < 5000) score -= 20;
      if (k > 50 && timeOnPage < 3000) score -= 15;

      const bounded = Math.max(0, Math.min(100, score));
      setBehaviorScore((prev) => (prev === bounded ? prev : bounded));
      const human = score >= 30;
      setIsHumanBehavior((prev) => (prev === human ? prev : human));
    };

    recalc();
    const id = setInterval(recalc, 2000);
    return () => clearInterval(id);
  }, []);

  const trackMouseMovement = useCallback(() => {
    setMouseMovements((prev) => prev + 1);

    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }

    mouseTimeoutRef.current = setTimeout(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (mouseMovementsRef.current > 100 && elapsed < 5000) {
        setBehaviorScore((prev) => Math.max(0, prev - 10));
      }
    }, 1000);
  }, []);

  const trackKeystroke = useCallback(() => {
    setKeystrokes((prev) => prev + 1);

    if (keystrokeTimeoutRef.current) {
      clearTimeout(keystrokeTimeoutRef.current);
    }

    keystrokeTimeoutRef.current = setTimeout(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (keystrokesRef.current > 50 && elapsed < 3000) {
        setBehaviorScore((prev) => Math.max(0, prev - 5));
      }
    }, 500);
  }, []);

  const checkHoneypot = useCallback((value: string) => {
    if (value && value !== '' && value !== honeypotValue) {
      setIsHoneypotTriggered(true);
      return false;
    }
    return true;
  }, [honeypotValue]);

  const incrementAttempts = useCallback(() => {
    const now = Date.now();
    const limit = RATE_LIMITS[difficultyLevel as keyof typeof RATE_LIMITS];

    if (now - lastAttemptTime > limit.windowMs) {
      setAttemptCount(1);
    } else {
      setAttemptCount((prev) => prev + 1);
    }

    setLastAttemptTime(now);

    if (attemptCount >= limit.maxAttempts) {
      setIsRateLimited(true);
      const remainingTime = Math.ceil((limit.windowMs - (now - lastAttemptTime)) / 1000);
      setRateLimitMessage(`Too many attempts. Please wait ${remainingTime} seconds before trying again.`);

      if (difficultyLevel < maxDifficulty) {
        setDifficultyLevel((prev) => prev + 1);
      }
    } else {
      setIsRateLimited(false);
      setRateLimitMessage('');
    }
  }, [attemptCount, lastAttemptTime, difficultyLevel, maxDifficulty]);

  const resetSecurity = useCallback(() => {
    setAttemptCount(0);
    setLastAttemptTime(0);
    setIsRateLimited(false);
    setRateLimitMessage('');
    setIsHoneypotTriggered(false);
    setMouseMovements(0);
    setKeystrokes(0);
    setBehaviorScore(0);
    setDifficultyLevel(1);
    startTimeRef.current = Date.now();
  }, []);

  const getSecurityStatus = useCallback(() => {
    const warnings: string[] = [];
    let score = 100;
    const elapsed = Date.now() - startTimeRef.current;

    if (isRateLimited) {
      warnings.push(rateLimitMessage);
      score -= 50;
    }

    if (isHoneypotTriggered) {
      warnings.push('Suspicious activity detected');
      score -= 100;
    }

    if (!isHumanBehavior && elapsed > 5000) {
      warnings.push('Unusual behavior detected');
      score -= 20;
    }

    if (difficultyLevel > 1) {
      warnings.push(`Security level increased due to repeated attempts`);
      score -= (difficultyLevel - 1) * 10;
    }

    return {
      isSecure: score >= 50 && !isHoneypotTriggered && !isRateLimited,
      warnings,
      score: Math.max(0, score),
    };
  }, [isRateLimited, rateLimitMessage, isHoneypotTriggered, isHumanBehavior, difficultyLevel]);

  const value: SecurityContextType = {
    attemptCount,
    lastAttemptTime,
    isRateLimited,
    rateLimitMessage,
    honeypotValue,
    isHoneypotTriggered,
    mouseMovements,
    keystrokes,
    getTimeOnPage,
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
