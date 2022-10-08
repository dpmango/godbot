/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { IChartObj } from "../../reducers/chartDataSlice.reducer";
import { useAppSelector } from "../../reducers/hooks.store";

export const TradingChart: React.FC<{
  colors: string[];
  parentWidth: number;
  visible: boolean;
  chartLines: IChartObj[];
}> = ({ colors, parentWidth, visible, chartLines }) => {
  const {userData} = useAppSelector(state => state.userState)

  const handleZoom = (e: any) => {
    if (e.deltaY === 100) {
      document
        .querySelector<HTMLInputElement>(".apexcharts-zoomout-icon")
        ?.click();
    } else {
      document
        .querySelector<HTMLInputElement>(".apexcharts-zoomin-icon")
        ?.click();
    }
  };

  useEffect(() => {
    document.querySelector<HTMLInputElement>(".apexcharts-pan-icon")?.click();
  }, []);

  return (
    <div className="chart">
      <div onWheel={handleZoom}>
        <Chart
          options={{
            chart: {
              id: "apexchart-example",
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            colors,
            stroke: {
              show: true,
              curve: "smooth",
              lineCap: "butt",
              colors: undefined,
              width: 4,
              dashArray: 0,
            },
            grid: {
              show: true,
              borderColor: "#90A4AE",
              strokeDashArray: 8,
              position: "back",
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
              padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            },
          }}
          width={"100%"}
          height={380}
          series={chartLines}
          type={userData?.rank === 'Инвестор' ? "area": "line"}
        />
      </div>
    </div>
  );
};
