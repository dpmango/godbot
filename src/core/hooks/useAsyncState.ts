import { Dispatch, SetStateAction } from 'react';

export function useAsyncState<T>(
  initialState: T
): [T, (s: T) => Promise<Dispatch<SetStateAction<T>>>] {
  const [state, setState] = useState<T>(initialState);

  const asyncSetState = (value: T) => {
    const PERF_TIME_SERIES = performance.now();
    return new Promise((resolve) => {
      setState(value);
      setState((current) => {
        resolve(current);
        PerformanceLog(PERF_TIME_SERIES, 'asyncSetState');
        return current as T;
      });
    });
  };

  return [state, asyncSetState as any];
}
