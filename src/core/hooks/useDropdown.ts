import { useRef, useState } from 'react';

const useDropdown = (initValue?: string) => {
  const [value, setValue] = useState(initValue);
  const [menuState, setMenuState] = useState(false);

  const handleStateChange = (state?: any) => {
    const newState = typeof state === 'boolean' ? state : !menuState;

    setMenuState(newState);
  };

  const handleChange: React.MouseEventHandler<HTMLElement> = (e) => {
    setValue((e.target as HTMLElement).textContent as string);
  };

  return {
    handleStateChange,
    handleChange,
    menuState,
    setValue,
    value,
  };
};

export { useDropdown };
