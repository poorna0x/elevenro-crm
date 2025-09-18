import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, MousePointer, Keyboard } from 'lucide-react';
import { useSecurity } from '@/contexts/SecurityContext';

interface SecurityStatusProps {
  showDetails?: boolean;
  className?: string;
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({ 
  showDetails = false, 
  className = '' 
}) => {
  const { 
    behaviorScore, 
    isHumanBehavior, 
    timeOnPage, 
    mouseMovements, 
    keystrokes,
    difficultyLevel,
    isRateLimited,
    getSecurityStatus 
  } = useSecurity();

  const securityStatus = getSecurityStatus();

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  if (!showDetails) {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <div className={`w-2 h-2 rounded-full ${
          securityStatus.isSecure ? 'bg-green-500' : 
          difficultyLevel > 1 ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        <span className="text-muted-foreground">
          Security: {securityStatus.score}%
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-muted/50 border border-border rounded-lg p-3 space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-foreground" />
          <span className="text-sm font-medium">Security Status</span>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          securityStatus.isSecure 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
        }`}>
          {securityStatus.score}%
        </div>
      </div>

      {securityStatus.warnings.length > 0 && (
        <div className="space-y-1">
          {securityStatus.warnings.map((warning, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">Time:</span>
          <span className="font-medium">{formatTime(timeOnPage)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MousePointer className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">Moves:</span>
          <span className="font-medium">{mouseMovements}</span>
        </div>
        <div className="flex items-center gap-1">
          <Keyboard className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">Keys:</span>
          <span className="font-medium">{keystrokes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">Level:</span>
          <span className="font-medium">{difficultyLevel}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <div className={`w-2 h-2 rounded-full ${
          isHumanBehavior ? 'bg-green-500' : 'bg-yellow-500'
        }`}></div>
        <span className="text-muted-foreground">
          Behavior: {isHumanBehavior ? 'Human-like' : 'Suspicious'}
        </span>
      </div>

      {isRateLimited && (
        <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          <AlertTriangle className="w-3 h-3" />
          <span>Rate limited - please wait</span>
        </div>
      )}
    </div>
  );
};

export default SecurityStatus;
