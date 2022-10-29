import { useState } from "react";

const useDropdown = (initValue?: string) => {
  const [value, setValue] = useState(initValue);
  const [menuState, setMenuState] = useState(false);

  const handleStateChange = () => {
    setMenuState(!menuState);
  };

  return {
    handleStateChange,
    menuState,
    setValue,
    value,
  };
};

export { useDropdown };
