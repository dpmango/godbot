import { useState, useEffect } from 'react';

const useSkeleton = (status: boolean) => {
  const [loading, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (status === true) {
      setTimeout(() => {
        setLoaded(false);
      }, 500);
    }
  }, [status]);

  return {
    loading,
  };
};
export { useSkeleton };
