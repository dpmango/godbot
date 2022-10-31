import React, { ForwardRefRenderFunction, useState } from "react";
import { IChartObj, setStateCoin } from "../../reducers/chartDataSlice.reducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { ChartDropdown } from "../Dropdown/ChartDropdown";
import { ChartUpdateTimer } from "./ChartUpdateTimer";

const ChartTable: React.FC<{}> = ({}, ref) => {
  const [timeChart, setTimeChart] = useState<string | null>("1 минута");
  const dispatch = useAppDispatch();
  const { currentCoin, data } = useAppSelector((state) => state.chartState);

  const handleTimeClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setTimeChart((e.target as HTMLElement).textContent);
  };

  const handleCoinClick: React.MouseEventHandler<HTMLElement> = (e) => {
    dispatch(setStateCoin((e.target as HTMLElement).textContent as string));
  };

  return (
    <div className="chart__head" ref={ref}>
      <h2 className="title">График прогноза</h2>
      <ChartDropdown title={currentCoin}>
        {data.graphs_data && (
          <ul>
            {Object.keys(data.graphs_data).map((elem, index) => (
              <li onClick={handleCoinClick} key={index}>
                {elem}
              </li>
            ))}
          </ul>
        )}
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
