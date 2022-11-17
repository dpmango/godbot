import { useState } from 'react';
import { useDropdown } from '@hooks/useDropdown';

interface IChartTable {
  children: React.ReactElement;
  title: string | null;
  disabled?: boolean;
}

export const ChartDropdown: React.FC<IChartTable> = ({ children, title, disabled }) => {
  const { handleStateChange, menuState } = useDropdown();

  return (
    <div className={disabled ? 'chart__dropdown disabled' : 'chart__dropdown'}>
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
