import React, { useEffect, useRef, useState, useContext } from "react";
import * as echarts from "echarts";
import { ChartLegend } from "./ChartLegend";
import { Loader } from "../UIelems/Loader";
import { set } from "immer/dist/internal";
import { useAppSelector } from "../../reducers/hooks.store";
import { ThemeContext } from "../../App";
import { parse } from "date-fns";

export const Echrt: React.FC<{ containerWidth: number; axisColor: string }> = ({
  containerWidth,
  axisColor,
}) => {
  const { data, currentCoin } = useAppSelector((state) => state.chartState);
  const [loader, setLoader] = useState(false);
  const [series, setSeries] = useState<any>([]);
  const [chartWidth, setChartWidth] = useState(1360);
  const [colors, setColors] = useState<any>([]);
  const [graph, setGraph] = useState<any>(null);
  const containerRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const initChart = async () => {
    const color = ["#3182bd", "#1c9099", "#43a2ca", "#9ebcda"];
    const series = [
      {
        name: "Real",
        type: "line",
        showSymbol: false,
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.data[currentCoin].map((elem: any) => elem.real),
      },
      {
        name: "Forecast",
        type: "line",
        smooth: true,
        showSymbol: false,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.data[currentCoin].map((elem: any) => elem.forecast),
      },
      {
        name: "Upper",
        type: "line",
        smooth: true,
        showSymbol: false,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.data[currentCoin].map((elem: any) => elem.upper),
      },
      {
        name: "Lower",
        type: "line",
        showSymbol: false,
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.data[currentCoin].map((elem: any) => elem.lower),
      },
    ];

    setSeries(series);
    setColors(color);

    const option = {
      tooltip: {
        formatter: function (params: any[]) {
          const wrapper = document.createElement("div");
          wrapper.className = "chart-info";
          const axisLabel = document.createElement("label");
          axisLabel.innerHTML = params[0]?.axisValue;

          params.forEach((elem) => {
            wrapper.insertAdjacentHTML(
              "afterbegin",
              `<div><i style="background: ${elem.color}"></i> <p>${
                elem.seriesName
              }:</p>  ${elem?.data?.toFixed(2) || "-"}</div>`
            );
          });
          wrapper.prepend(axisLabel);

          return wrapper;
        },
        position: "top",
        trigger: "axis",
        className: "chart__tooltip",
        axisPointer: {
          animation: false,
        },
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
        data: ["1", "2", "3"],
      },
      toolbox: {
        show: false,
        feature: {
          magicType: { show: true, type: ["stack", "tiled"] },
          saveAsImage: { show: true, name: "GODBOT chart" },
        },
      },
      series,
      xAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: axisColor,
          },
        },
        axisLabel: {
          rotate: window.innerWidth < 576 ? 8 : 0,
          fontSize: window.innerWidth < 576 ? 9 : 12,
        },
        data: data.data[currentCoin]
          .map((elem: any) => {
            const userDate = elem.timestamp.slice(0, 10).split("-").join(".");
            const userMinutes = elem.timestamp
              .slice(11, 16)
              .split("-")
              .join(":");
            const options = {
              weekday: "short",
              month: "long",
              day: "numeric",
            };
            const date = parse(userDate as string, "yyyy.MM.dd", new Date());
            return (
              date.toLocaleDateString("eu-EU", options as any) +
              " " +
              userMinutes
            );
          })
          .reverse(),
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: axisColor,
          },
        },
        axisLabel: {
          align: "right",
          margin: window.innerWidth < 876 ? 3 : 12,
          fontSize: window.innerWidth < 576 ? 9 : 12,
          verticalAlign: "top",
        },
      },
    };

    graph?.setOption(option);
    if (!graph) {
      setGraph(echarts.init(containerRef.current));
    }
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    window.onresize = function () {
      // setChartWidth(
      //   document.querySelector(".table__inner")?.clientWidth as number
      // );
      graph.resize();
    };
  };

  useEffect(() => {
    if (data.data) {
      initChart();
    }
  }, [graph, currentCoin, data.data]);

  useEffect(() => {
    initChart();
  }, [ctx?.theme]);

  const handleClick = (title: string) => {
    graph?.dispatchAction({ type: "legendToggleSelect", name: title });
  };

  return (
    <>
      <ChartLegend colors={colors} data={series} handleToggle={handleClick} />
      <div
        ref={containerRef}
        className="chart-container"
        style={{
          height: "545px",
          width:
            window.innerWidth < 876
              ? "100%"
              : window.innerWidth < 1140
              ? chartWidth + 170 + "px"
              : chartWidth + 200 + "px",
          marginLeft: window.innerWidth < 876 ? "25px" : "-80px",
          marginTop: "-30px",
          zIndex: "-10",
          position: "relative",
          opacity: loader ? "1" : "0",
        }}
      ></div>
      {!loader ? (
        <div className="chart__load">
          <Loader />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
