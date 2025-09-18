import React, { useEffect, useRef } from 'react';
import { useSecurity } from '@/contexts/SecurityContext';

interface HoneypotFieldProps {
  name?: string;
  className?: string;
}

const HoneypotField: React.FC<HoneypotFieldProps> = ({ 
  name = 'website', 
  className = '' 
}) => {
  const { honeypotValue, checkHoneypot } = useSecurity();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set the honeypot value when component mounts
    if (inputRef.current) {
      inputRef.current.value = honeypotValue;
    }
  }, [honeypotValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if bot filled the honeypot field
    checkHoneypot(e.target.value);
  };

  return (
    <div 
      className={`absolute left-[-9999px] opacity-0 pointer-events-none ${className}`}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor={name} className="sr-only">
        Please leave this field empty
      </label>
      <input
        ref={inputRef}
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        tabIndex={-1}
        onChange={handleChange}
        className="w-0 h-0 border-0 p-0 m-0"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default HoneypotField;
