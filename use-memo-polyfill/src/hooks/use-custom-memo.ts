import { useEffect, useRef } from 'react';

const isEqual = (prev: any[], current: any[]) => {
  if (prev === null || prev.length !== current.length) return false;

  for (let i = 0; i < current.length; i++) {
    if (current[i] !== prev[i]) return false;
  }

  return true;
};

export const useCustomMemo = (cb: () => any, deps: Array<any>) => {
  const ref = useRef<{
    value: any;
    deps: any[];
  } | null>(null);

  // Check for change in deps
  if (ref.current === null || !isEqual(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: cb(),
    };
  }

  // Clean up
  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  // Output
  return ref.current?.value || null;
};
