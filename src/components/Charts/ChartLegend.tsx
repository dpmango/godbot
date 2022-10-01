/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IChartObj } from "../../reducers/chartDataSlice.reducer";
interface IButton {
  title: string;
  active: boolean;
}

export const ChartLegend: React.FC<{
  active: boolean;
  colors: string[];
  data: IChartObj[];
  onClick: () => void;
  handleEditChart: (title: string, index: number) => void;
}> = ({ active, colors, onClick, data, handleEditChart }) => {
  const [buttons, setButtons] = useState<IButton[]>([]);

  const handleClick = (title: string, index: number) => {
    setButtons(
      buttons.map((elem) => {
        if (elem.title === title) {
          elem.active = !elem.active;
        }
        return elem;
      })
    );
    handleEditChart(title, index);
  };

  useEffect(() => {
    if (data.length) {
      setButtons(
        data.map((elem) =>
          Object.assign({}, { title: elem.name, active: true })
        )
      );
    }
  }, [data]);

  return (
    <>
      <div
        className={
          active
            ? "chart__legend-blur chart__legend-blur--active"
            : "chart__legend-blur"
        }
      ></div>
      <div
        className={
          active ? "chart__legend chart__legend--active" : "chart__legend"
        }
      >
        <div className="chart__legend-head">
          <p className="chart__legend-title">Trading Legend</p>
          <button className="chart__legend-close" onClick={onClick}>
            &times;
          </button>
        </div>
        <ul className="chart__legend-list">
          {buttons.length ? (
            buttons.map((elem, index) => (
              <li
                key={elem.title}
                onClick={() => handleClick(elem.title, index)}
                className={
                  elem.active
                    ? "chart__legend-item chart__legend-item--active"
                    : "chart__legend-item"
                }
              >
                <button></button>
                <div style={{ background: colors[index] }}></div>
                <p>{elem.title}</p>
              </li>
            ))
          ) : (
            <p>Loading</p>
          )}
        </ul>
      </div>
    </>
  );
};
