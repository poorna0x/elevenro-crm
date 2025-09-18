import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Check, X } from 'lucide-react';

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
  onAutoSubmit?: () => void;
  className?: string;
}

interface MathChallenge {
  question: string;
  answer: number;
}

const MathCaptcha: React.FC<MathCaptchaProps> = ({ onVerify, onAutoSubmit, className = '' }) => {
  const [challenge, setChallenge] = useState<MathChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateChallenge = (): MathChallenge => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch(operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
        break;
      case '×':
        // Keep multiplication simple (1-5 range)
        const factor1 = Math.floor(Math.random() * 5) + 1;
        const factor2 = Math.floor(Math.random() * 5) + 1;
        answer = factor1 * factor2;
        question = `${factor1} × ${factor2} = ?`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }
    
    return { question, answer };
  };

  const initializeChallenge = () => {
    const newChallenge = generateChallenge();
    setChallenge(newChallenge);
    setUserAnswer('');
    setIsVerified(false);
    setShowError(false);
    onVerify(false);
  };

  useEffect(() => {
    initializeChallenge();
  }, []);

  const handleSubmit = async () => {
    if (!challenge || !userAnswer.trim()) {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userAnswerNum = parseInt(userAnswer.trim());
    const isValid = userAnswerNum === challenge.answer;
    
    setIsVerified(isValid);
    setShowError(!isValid);
    onVerify(isValid);
    
    if (isValid) {
      // Auto-submit the form after successful verification
      setTimeout(() => {
        if (onAutoSubmit) {
          onAutoSubmit();
        }
      }, 1000);
    } else {
      // Reset for retry after 2 seconds
      setTimeout(() => {
        initializeChallenge();
      }, 2000);
    }
    
    setIsLoading(false);
  };

  const handleRefresh = () => {
    initializeChallenge();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-foreground">Security Check</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <RefreshCw className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">Please solve this simple math problem:</p>
          <div className="bg-muted border border-border rounded-md p-3">
            <p className="text-xl font-mono font-bold text-foreground">
              {challenge?.question}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setShowError(false);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Your answer"
            className={`flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              showError ? 'border-red-500' : ''
            }`}
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !userAnswer.trim()}
            className="px-4"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isVerified ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              'Check'
            )}
          </Button>
        </div>
        
        {showError && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <X className="w-4 h-4" />
            <span>Incorrect answer. Please try again.</span>
          </div>
        )}
        
        {isVerified && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Check className="w-4 h-4" />
            <span>Verified! You can proceed.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathCaptcha;
