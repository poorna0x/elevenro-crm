import React, { useEffect, useRef } from 'react';
import { useSecurity } from '@/contexts/SecurityContext';

interface BehavioralTrackerProps {
  children: React.ReactNode;
  className?: string;
}

const BehavioralTracker: React.FC<BehavioralTrackerProps> = ({ 
  children, 
  className = '' 
}) => {
  const { trackMouseMovement, trackKeystroke } = useSecurity();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMouseTimeRef = useRef<number>(0);
  const lastKeystrokeTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle mouse movements to avoid excessive tracking
      if (now - lastMouseTimeRef.current > 100) {
        trackMouseMovement();
        lastMouseTimeRef.current = now;
      }
    };

    // Keystroke tracking
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      // Throttle keystrokes to avoid excessive tracking
      if (now - lastKeystrokeTimeRef.current > 50) {
        trackKeystroke();
        lastKeystrokeTimeRef.current = now;
      }
    };

    // Click tracking
    const handleClick = () => {
      trackMouseMovement();
    };

    // Focus tracking
    const handleFocus = () => {
      trackKeystroke();
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('keydown', handleKeyDown, { passive: true });
    container.addEventListener('click', handleClick, { passive: true });
    container.addEventListener('focus', handleFocus, { passive: true });

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('focus', handleFocus);
    };
  }, [trackMouseMovement, trackKeystroke]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default BehavioralTracker;
