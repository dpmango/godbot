import React, { useState } from "react";
import { useDropdown } from "../../hooks/useDropdown";

interface IChartTable {
  children: React.ReactElement;
  title: string | null;
}

export const ChartDropdown: React.FC<IChartTable> = ({ children, title }) => {
  const { handleStateChange, menuState } = useDropdown();

  return (
    <div className="chart__dropdown">
      <button
        onClick={handleStateChange}
        className={
          menuState
            ? "chart__dropdown-button chart__dropdown-button--active"
            : "chart__dropdown-button"
        }
      >
        {title}
      </button>
      <div
        onClick={handleStateChange}
        className={
          menuState
            ? "chart__dropdown-wrapper chart__dropdown-wrapper--active"
            : "chart__dropdown-wrapper"
        }
      >
        {children}
      </div>
    </div>
  );
};
