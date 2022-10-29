import { useState, useEffect } from "react";

const useSkeleton = (status: boolean) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (status === true) {
      setTimeout(() => {
        setLoaded(false);
      }, 1000);
    }
  });

  return {
    loaded
  }
};
export { useSkeleton };
