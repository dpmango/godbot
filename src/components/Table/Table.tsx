import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { getChartData, IChartObj } from "../../reducers/chartDataSlice.reducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks.store";
import { SideAdds } from "../SideAdds/SideAdds";
import { TableSwitch } from "./TableSwitch";
import React from "react";
import "../Charts/chart.scss";
import { Echrt } from "../Charts/Echrt";
import ChartTable from "../Charts/ChartTable";
import { LockScreen } from "../UIelems/LockScreen";
import { getInvestorData } from "../../reducers/investorSlice.reducer";
import { InvestorChart } from "../Charts/InvestorChart";
import { ThemeContext } from "../../App";

export const Table: React.FC<{}> = () => {
  const [visible, setVisible] = useState(true);
  const ctx = useContext(ThemeContext);
  const [investorTable, setInvestorTable] = useState(false);
  const { data } = useAppSelector((state) => state.chartState);
  const investorData = useAppSelector((state) => state.investorState);
  const { userData, timeDiff } = useAppSelector((state) => state.userState);
  const [chartLines, setChartLines] = useState(data);
  const addsRef: MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData?.data.tariff !== null && !timeDiff) {
      dispatch(getChartData("coin=BTC"));
    }
  }, []);

  useEffect(() => {
    setChartLines(data);
  }, [data]);

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (!investorData.graphs.data?.length && userData?.data.tariff !== null && !timeDiff ) {
      dispatch(getInvestorData());
    }
  }, []);

  return (
    <div className={!visible ? "table__wrapper _hidden" : "table__wrapper"}>
      {userData?.data.tariff === null || timeDiff ? (
        ""
      ) : (
        <TableSwitch
          investorTable={investorTable}
          setInvestorTable={setInvestorTable}
        />
      )}
      <div className="table__inner" ref={addsRef}>
        {timeDiff || userData?.data.tariff === null ? <LockScreen /> : ""}
        <div
          className={visible ? "table" : "table table--hidden"}
          style={{
            overflow: investorTable ? "visible" : "hidden",
            maxHeight: investorTable ? "100%" : "570px",
            background:
              window.innerWidth < 576 && investorTable
                ? "transparent"
                : ctx?.theme
                ? "#1c2326"
                : "white",
          }}
        >
          {userData?.data.tariff === "New" ? (
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
          <div style={{ display: investorTable ? "none" : "flex" }}>
            <ChartTable />
          </div>
          {!investorTable ? (
            <Echrt
              containerWidth={addsRef.current?.clientWidth}
              axisColor={ctx?.theme ? "#303235" : "#ccc5ff7b"}
            />
          ) : (
            <InvestorChart />
          )}
        </div>
        {/* <SideAdds setVisible={handleClick} visible={visible} /> */}
      </div>
    </div>
  );
};
