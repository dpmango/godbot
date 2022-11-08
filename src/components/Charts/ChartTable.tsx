import React, { ForwardRefRenderFunction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setStateCoin } from "../../reducers/chartDataSlice.reducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { checkOnPro } from "../../scripts/scripts";
import { ChartDropdown } from "../Dropdown/ChartDropdown";
import { ChartUpdateTimer } from "./ChartUpdateTimer";

const ChartTable: React.FC<{}> = ({}, ref) => {
  const { userData, loading } = useAppSelector((state) => state.userState);

  const [timeChart, setTimeChart] = useState<string | null>("15 минут");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentCoin, data } = useAppSelector((state) => state.chartState);

  const handleTimeClick: React.MouseEventHandler<HTMLElement> = (e) => {
    setTimeChart((e.target as HTMLElement).textContent);
  };

  const handleCoinClick: React.MouseEventHandler<HTMLElement> = (e) => {
    dispatch(setStateCoin((e.target as HTMLElement).textContent as string));
    navigate(
      `?coin=${(e.target as HTMLElement).textContent}?timestamp=${
        timeChart?.split(" ")[0]
      }`
    );
  };

  if (loading !== 'fulfilled') return <div></div>

  return (
    <div className="chart__head" ref={ref}>
      <h2 className="title">График прогноза</h2>
      <div className="chart__wrapper">
        <ChartDropdown title={currentCoin}>
          {<data className="data"></data> && (
            <ul>
              {Object.keys(data.data).map((elem, index) => (
                <li
                  onClick={handleCoinClick}
                  className={checkOnPro(userData) ? "" : "pro"}
                  key={index}
                >
                  <p>{elem}</p>
                </li>
              ))}
              {checkOnPro(userData) ? (
                <li>
                  <button>Заказать просчет +</button>
                </li>
              ) : (
                ""
              )}
            </ul>
          )}
        </ChartDropdown>
        <ChartDropdown title={timeChart} disabled>
          {
            <ul>
              <li onClick={handleTimeClick}>15 минут</li>
            </ul>
          }
        </ChartDropdown>
      </div>
      <ChartUpdateTimer />
      <button className="chart__download">CКАЧАТЬ</button>
    </div>
  );
};

export default React.forwardRef(
  ChartTable as ForwardRefRenderFunction<React.ReactElement>
);
