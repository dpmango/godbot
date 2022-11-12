import React, { FC, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useAppSelector } from "../../reducers/hooks.store";
import Cookies from "js-cookie";

interface IInvestorChartProps {}

export const InvestorChart: FC<IInvestorChartProps> = () => {
  const { graphs } = useAppSelector((state) => state.investorState);
  const refsCollection: any = useRef();

  useEffect(() => {
    graphs?.data?.forEach(async (elem, index) => {
      const graph: any = null;
      const resp = await fetch('./inv.json', {
        method: "GET",
        headers: {
          "Content-Type": "application/json" as string,
          "X-CSRFToken": Cookies.get("csrftoken") as string,
        },
      });
      const data = await resp.json();

      const color = ["#3182bd", "#1c9099", "#43a2ca", "#9ebcda"];

      const series = [
        {
          name: "Low",
          type: "line",
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data["low"]),
        },
        {
          name: "BTC Price",
          type: "line",
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data["price_btc"]),
        },
        {
          name: "Trend Forecast",
          type: "line",
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data["trend_forecast"]),
        },
        {
          name: "Up",
          type: "line",
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data["up"]),
        },
      ];

      const option = {
        tooltip: {
          position: "top",
          trigger: "item",
          className: "chart__tooltip",
        },
        color,
        dataZoom: [
          {
            throttle: 0,
            type: "inside",
            xAxisIndex: [0],
            start: 50,
            end: 60,
          },
          {
            throttle: 0,
            type: "inside",
            yAxisIndex: [0],
            start: 90,
            end: 100,
          },
        ],
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series,
        xAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#efefefa3",
            },
          },
          axisLabel: {
            rotate: window.innerWidth < 576 ? 8 : 0,
            fontSize: 8,
          },
          data: Object.values(data["time_list_forecast"]),
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#efefefa3",
            },
          },
          axisLabel: {
            align: "right",
            margin: window.innerWidth < 876 ? 3 : 12,
            fontSize: 8,
            verticalAlign: "top",
          },
        },
      };

      const chartDom =
        refsCollection.current.childNodes[index].querySelector("#graph");
      const myChart = echarts.init(chartDom);

      myChart.setOption(option);
    });
  }, []);

  if (!graphs) return <div></div>;

  return (
    <div ref={refsCollection} className="investor">
      {graphs?.data?.map((elem) => (
        <div className="investor__card">
          <div className="investor__wrapper">
            <img src={elem.currency_icon} />
            <p>
              {elem.currency}
              <span>{elem.currency.slice(0, 3).toUpperCase()}</span>
            </p>
          </div>
          <div
            className="investor__chart"
            id="graph"
            style={{ height: "252px", width: "310px" }}
          ></div>
        </div>
      ))}
    </div>
  );
};
