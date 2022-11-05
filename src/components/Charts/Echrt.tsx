import React, { useEffect, useRef, useState, useContext } from "react";
import * as echarts from "echarts";
import { ChartLegend } from "./ChartLegend";
import { Loader } from "../UIelems/Loader";
import { set } from "immer/dist/internal";
import { useAppSelector } from "../../reducers/hooks.store";
import { ThemeContext } from "../../App";

export const Echrt: React.FC<{ containerWidth: number }> = ({
  containerWidth,
}) => {
  const { data, currentCoin } = useAppSelector((state) => state.chartState);
  const [loader, setLoader] = useState(false);
  const [series, setSeries] = useState<any>([]);
  const [chartWidth, setChartWidth] = useState(1360);
  const [colors, setColors] = useState<any>([]);
  const [graph, setGraph] = useState<any>(null);
  const containerRef: any = useRef();
  const ctx = useContext(ThemeContext)

  const initChart = async () => {
    const resp = await fetch("./test.json");
    const dataJson = await resp.json();

    const color = ["#3182bd", "#1c9099", "#43a2ca", "#9ebcda"];
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
            color:  ctx?.theme ? '#5F636A' : '#DDDFE1'
          },
        },
        axisLabel: {
          rotate: window.innerWidth < 576 ? 8 : 0,
          fontSize: window.innerWidth < 576 ? 9 : 12,
        },
        data: data.graphs_data[currentCoin]
          .map(
            (elem: any) =>
              elem.timestamp.slice(0, 10) + " " + elem.timestamp.slice(11, 19)
          )
          .reverse(),
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color:  ctx?.theme ? '#5F636A' : '#DDDFE1'
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
    setGraph(echarts.init(containerRef.current));
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    window.onresize = function () {
      setChartWidth(
        document.querySelector(".table__inner")?.clientWidth as number
      );
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
          width:
            window.innerWidth < 876
              ? "100%"
              : window.innerWidth < 1140
              ? chartWidth + 170 + "px"
              : chartWidth + 200 + "px",
          marginLeft: window.innerWidth < 876 ? "10px" : "-80px",
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
