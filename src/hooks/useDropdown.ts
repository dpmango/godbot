import { useState } from "react";

const useDropdown = () => {
  const [menuState, setMenuState] = useState(false);

  const handleStateChange = () => {
    setMenuState(!menuState);
  };

  return {
    handleStateChange,
    menuState,
  };
};

export { useDropdown };
