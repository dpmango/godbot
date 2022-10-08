import React, { ForwardRefRenderFunction, useState } from "react";
import { IChartObj } from "../../reducers/chartDataSlice.reducer";
import { ChartDropdown } from "../Dropdown/ChartDropdown";
import { ChartUpdateTimer } from "./ChartUpdateTimer";

const ChartTable: React.FC<{}> = ({}, ref) => {
  const [timeChart, setTimeChart] = useState<string | null>("1 минута");
  const [coin, setCoin] = useState<string | null>("Bitcoin (BTC)");

  const handleTimeClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setTimeChart((e.target as HTMLElement).textContent);
  };

  const handleCoinClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setCoin((e.target as HTMLElement).textContent);
  };

  return (
    <div className="chart__head" ref={ref}>
      <h2 className="title">График прогноза</h2>
      <ChartDropdown title={coin}>
        {
          <ul>
            <li onClick={handleCoinClick}>Polygon (MATIC)</li>
          </ul>
        }
      </ChartDropdown>
      <ChartDropdown title={timeChart}>
        {
          <ul>
            <li onClick={handleTimeClick}>15 минут</li>
          </ul>
        }
      </ChartDropdown>
      <ChartUpdateTimer />
      <button className="chart__download">CКАЧАТЬ</button>
    </div>
  );
};

export default React.forwardRef(
  ChartTable as ForwardRefRenderFunction<React.ReactElement>
);
