import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { ChartLegend } from "./ChartLegend";
import { Loader } from "../UIelems/Loader";
import { set } from "immer/dist/internal";
const arrayGenerator = require("array-generator");

export const Echrt: React.FC<{}> = () => {
  const [loader, setLoader] = useState(false);
  const [series, setSeries] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [graph, setGraph] = useState<any>(null);
  const containerRef: any = useRef();

  const initChart = async () => {
    const resp = await fetch("./test.json");
    const dataJson = await resp.json();

    const color = [
      "#3182bd",
      "#636363",
      "#de2d26",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ];
    const series = [
      {
        name: "Real",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: Object.values(dataJson.real),
      },
      {
        name: "Ghost",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 3,
          type: "dashed",
        },
        data: Object.values(dataJson.Forecast_ghost),
      },
      {
        name: "Forecast - 1",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: Object.values(dataJson.Forecast_1),
      },
      {
        name: "High close trend",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: Object.values(dataJson.HIGH_close_trend_),
      },
      {
        name: "Low close trend",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: Object.values(dataJson.LOW_close_trend_),
      },
      {
        name: "Pump - Dump",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: Object.values(dataJson["pump/dump"]),
      },
    ];

    setSeries(series);
    setColors(color);

    const option = {
      tooltip: {
        position: "top",
        trigger: "item",
        className: "chart__tooltip",
      },
      color,
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          yAxisIndex: [0],
          start: 50,
          end: 100,
        },
      ],
      legend: {
        show: false,
        data: ["1", "2", "3"],
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ["stack", "tiled"] },
          saveAsImage: { show: true },
        },
      },
      series,
      xAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        data: Object.values(dataJson.Datetime),
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
      },
    };
    graph?.setOption(option);
    setGraph(echarts.init(containerRef.current));
    setTimeout(() => {
      setLoader(true);
    }, 1000);
  };
  useEffect(() => {
    initChart();
  }, [graph]);

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
          height: "430px",
          width: "100%",
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
