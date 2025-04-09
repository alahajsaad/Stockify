import React, { useRef, useEffect, useState } from "react";

type OtpInputProps = {
  length: number;
  onComplete?: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    // Focus the first input on mount
    inputRefs.current[0]?.focus();
    
    // Resize the refs array when length changes
    inputRefs.current = inputRefs.current.slice(0, length);
    setOtp(prev => {
      const newOtp = [...prev];
      while (newOtp.length < length) newOtp.push('');
      return newOtp.slice(0, length);
    });
  }, [length]);

  useEffect(() => {
    // Call onComplete callback when all fields are filled
    if (otp.length === length && otp.every(digit => digit !== '')) {
      onComplete?.(otp.join(''));
    }
  }, [otp, length, onComplete]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    // Handle case when value is empty or single digit
    const digit = value.slice(-1);
    
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = digit;
      return newOtp;
    });

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current input if it has a value
        setOtp(prev => {
          const newOtp = [...prev];
          newOtp[index] = '';
          return newOtp;
        });
      } else if (index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(paste)) return;

    const digits = paste.slice(0, length).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, i) => {
      if (i < length) {
        newOtp[i] = digit;
      }
    });
    
    setOtp(newOtp);

    // Focus the appropriate input after paste
    if (digits.length >= length) {
      inputRefs.current[length - 1]?.focus();
    } else {
      inputRefs.current[Math.min(digits.length, length - 1)]?.focus();
    }
  };

  return (
    <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
      {Array.from({ length }).map((_, i) => (
        <div key={i}>
          <label htmlFor={`code-${i}`} className="sr-only">
            Code {i + 1}
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            id={`code-${i}`}
            ref={el => {
              inputRefs.current[i] = el;
            }}
            value={otp[i] || ''}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            onFocus={e => e.target.select()}
            onPaste={handlePaste}
            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;