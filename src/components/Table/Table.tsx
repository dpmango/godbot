import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getChartData, IChartObj } from "../../reducers/chartDataSlice.reducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { ChartTable } from "../Charts/ChartTable";
import { TradingChart } from "../Charts/TradingChart";
import { SideAdds } from "../SideAdds/SideAdds";
import { TableInvestor } from "./TableInvestor";
import { TableSwitch } from "./TableSwitch";

export const Table: React.FC<{}> = () => {
  const [visible, setVisible] = useState(true);
  const [investorTable, setInvestorTable] = useState(false);
  const [width, setWidth] = useState<string | number>(1073);
  const { data } = useAppSelector((state) => state.chartState);
  const { userData } = useAppSelector((state) => state.userState);
  const [chartLines, setChartLines] = useState(data);
  const addsRef: MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChartData("coin=BTC"));
  }, []);

  useEffect(() => {
    setChartLines(data);
  }, [data]);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleEditChart = (title: string, index: number) => {
    if (chartLines.find((elem: IChartObj) => elem.name === title)) {
      setChartLines(chartLines.filter((elem) => elem.name !== title));
    } else {
      setChartLines(chartLines.concat(data[index]));
    }
  };

  useEffect(() => {
    if (visible) {
      setWidth(addsRef?.current?.clientWidth - 267);
    } else {
      setTimeout(() => {
        setWidth(addsRef?.current?.clientWidth);
      }, 700);
      setTimeout(() => {
        setWidth("100%");
      }, 800);
    }
  }, [visible]);

  return (
    <div className={!visible ? "table__wrapper _hidden" : "table__wrapper"}>
      {userData?.rank !== "Новичок" ? (
        <TableSwitch
          investorTable={investorTable}
          setInvestorTable={setInvestorTable}
        />
      ) : (
        ""
      )}
      <div className="table__inner" ref={addsRef}>
        <div
          className={visible ? "table" : "table table--hidden"}
          style={{
            width,
          }}
        >
          {userData?.rank === "New" ? (
            <div className="table__lock">
              <div>
                <img src="./images/Lock.svg" alt="Lock" />
                <p>
                  Для отображения графика нейронной сети необходимо выбрать
                  тариф
                </p>
                <Link className="table__link" to={"/payment"}>
                  ВЫБРАТЬ ТАРИФ
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {!investorTable ? (
            <ChartTable handleEditChart={handleEditChart} data={data} />
          ) : (
            ""
          )}
          {!investorTable ? (
            <TradingChart
              chartLines={chartLines}
              visible={visible}
              parentWidth={addsRef?.current?.clientWidth}
              colors={["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"]}
            />
          ) : (
            <TableInvestor />
          )}
        </div>
        <SideAdds setVisible={handleClick} visible={visible} />
      </div>
    </div>
  );
};
