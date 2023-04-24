interface WindowSizeDemensions {
  width: number;
  height: number;
  isVerticalMobile: boolean;
  isTablet: boolean;
}

export const useWindowParams = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeDemensions>({
    width: 0,
    height: 0,
    isVerticalMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isVerticalMobile = width < 575 && height < 930;
      const isTablet = width < 768;

      setWindowSize({
        width,
        height,
        isVerticalMobile,
        isTablet,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
