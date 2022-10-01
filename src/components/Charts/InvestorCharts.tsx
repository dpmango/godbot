import Chart from "react-apexcharts";
import React from "react";
import { ApexOptions } from "apexcharts";

export interface IInvestorCharts {
  title: string;
  icon: string;
  series: ApexOptions["series"];
}

export const InvestorCharts: React.FC<IInvestorCharts> = ({
  series,
  icon,
  title,
}) => {
  return (
    <li className="investor__card">
      <h6 className="investor__title">
        <img src={`./images/${icon}`} alt="" /> {title}
      </h6>
      <Chart
        options={{
          chart: {
            id: "apexchart-example",
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
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
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          yaxis: {
            labels: {
              offsetX: -10
            }
          }
        }}
        width={313}
        height={165}
        series={series}
        type="line"
      />
    </li>
  );
};
