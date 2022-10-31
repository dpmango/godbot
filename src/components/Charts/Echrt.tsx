import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { ChartLegend } from "./ChartLegend";
import { Loader } from "../UIelems/Loader";
import { set } from "immer/dist/internal";
import { useAppSelector } from "../../reducers/hooks.store";

export const Echrt: React.FC<{}> = () => {
  const { data, currentCoin } = useAppSelector((state) => state.chartState);
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
        data: data.graphs_data[currentCoin].map((elem: any) => elem.real),
      },
      {
        name: "Forecast",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.graphs_data[currentCoin].map((elem: any) => elem.forecast),
      },
      {
        name: "Upper",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.graphs_data[currentCoin].map((elem: any) => elem.upper),
      },
      {
        name: "Lower",
        type: "line",
        smooth: true,
        clip: false,
        lineStyle: {
          width: 2,
        },
        data: data.graphs_data[currentCoin].map((elem: any) => elem.lower),
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
          },
        },
        data: data.graphs_data[currentCoin].map((elem: any) => elem.timestamp),
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          align: "right",
          margin: 12,
          verticalAlign: "top",
        },
      },
    };
    graph?.setOption(option);
    setGraph(echarts.init(containerRef.current));
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    window.onresize = function () {
      graph.resize();
    };
  };

  useEffect(() => {
    if (data.graphs_data) {
      initChart();
    }
  }, [graph, currentCoin, data.graphs_data]);

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
          width: "1567px",
          marginLeft: "-80px",
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
