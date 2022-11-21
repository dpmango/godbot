import { useRef } from 'react';
import { useDropdown, useClickOutside } from '@hooks';

interface IChartDropdown {
  children: React.ReactElement;
  title: string | null;
  disabled?: boolean;
}

export const ChartDropdown: React.FC<IChartDropdown> = ({ children, title, disabled }) => {
  const { handleStateChange, menuState } = useDropdown();

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => handleStateChange(false));

  return (
    <div className={disabled ? 'chart__dropdown disabled' : 'chart__dropdown'} ref={wrapperRef}>
      <button
        onClick={handleStateChange}
        className={
          menuState
            ? 'chart__dropdown-button chart__dropdown-button--active'
            : 'chart__dropdown-button'
        }>
        {title}
      </button>
      <div
        onClick={handleStateChange}
        className={
          menuState
            ? 'chart__dropdown-wrapper chart__dropdown-wrapper--active'
            : 'chart__dropdown-wrapper'
        }>
        {children}
      </div>
    </div>
  );
};
