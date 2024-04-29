'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Props = {};

const ProgressBar = (props: Props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const progress = setInterval(
      () =>
        setValue(current => {
          if (current >= 100) {
            clearInterval(progress);
            return current;
          }
          return current + 1;
        }),
      100
    );

    return () => setValue(0);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      className="bg-neutral-200 relative overflow-hidden h-6 max-w-xl rounded-full"
    >
      <div
        style={{ width: `100%`, transform: `scaleX(${value}%)`, transformOrigin: 'left' }}
        className={cn('bg-gradient-to-r  from-[rgb(32,109,73)]  to-[rgb(43,150,19)] h-full')}
      ></div>
      <span
        className={cn('absolute z-20 font-bold w-full text-center inset-0', {
          'text-white': value >= 50,
          'text-green-700': value < 50,
        })}
      >
        {value}
      </span>
    </div>
  );
};

export default ProgressBar;
