'use client';

import { useRef, useState } from 'react';

type Props = {
  phoneNumber: string;
  otp: string[];
  setOtp: (value: string[]) => void;
};

const OtpInput = ({ phoneNumber, otp, setOtp }: Props) => {
  const otpContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (inputIndex: number, value: string) => {
    // Check if input is a number

    if (!/[0-9]/.test(value)) return;

    // Update input value
    const newOtp = [...otp];
    newOtp[inputIndex] = value.slice(0, 1);
    setOtp(newOtp);

    // Focus on the next input if any
    if (otpContainerRef.current) {
      (
        otpContainerRef.current.childNodes[
          Math.min(inputIndex + 1, otp.length - 1)
        ] as HTMLInputElement
      ).focus();
    }
  };

  const handleDelete = (inputIndex: number) => {
    // Update input value
    const newOtp = [...otp];
    newOtp[inputIndex] = '';
    setOtp(newOtp);

    // Focus on the prev input if any
    if (otpContainerRef.current) {
      (otpContainerRef.current.childNodes[Math.max(inputIndex - 1, 0)] as HTMLInputElement).focus();
    }
  };

  return (
    <div className="bg-sky-950 flex-col h-[30rem] w-full max-w-lg rounded-xl p-4 flex items-center justify-center">
      <h2 className="text-lg text-neutral-200">Enter OTP send on {phoneNumber}</h2>
      <div ref={otpContainerRef} className="mt-8 gap-3 items-center justify-center flex">
        {[...new Array(otp.length)].map((_, index) => (
          <input
            onKeyDown={e => {
              if (e.key === 'Backspace') handleDelete(index);
            }}
            value={otp.slice(index, index + 1)}
            onChange={e => handleChange(index, e.target.value)}
            key={index}
            className="w-14 text-white h-14 text-xl font-semibold  text-center focus:border-neutral-100 rounded-lg bg-transparent border border-neutral-400 "
            type="text"
            name={`otp-input-${index}`}
            id=""
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
