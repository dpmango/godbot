import { FC, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { parse } from 'date-fns';

import { useAppSelector } from '@store';
import { api } from '@core';

interface IInvestorChartProps {}

export const InvestorChart: FC<IInvestorChartProps> = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const { graphs } = useAppSelector((state) => state.investorState);
  const refsCollection: any = useRef();

  const setCardsVisible = (method: string) => {
    for (let i = 4; i < refsCollection.current.childNodes.length; i++) {
      refsCollection.current.childNodes[i].classList[method]('mob-hidden');
    }

    if (method === 'remove') {
      setVisible(false);
    }
  };

  useEffect(() => {
    graphs?.data?.forEach(async (elem, index) => {
      const graph: any = null;
      const { data } = await api(elem.graph_path, {});

      if (!data) return;

      const color = ['#3182bd', '#1c9099', '#43a2ca', '#9ebcda'];

      const timestamp = Object.values(data.time_list_forecast).map((elem: any) => {
        const userDate = elem.slice(0, 10).split('-').join('.');
        const userMinutes = elem.slice(11, 16).split('-').join(':');
        const options = {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
        };
        const date = parse(userDate as string, 'yyyy.MM.dd', new Date());
        return date.toLocaleDateString('eu-EU', options as any) + ' ' + userMinutes;
      });

      const series = [
        {
          name: 'Low',
          type: 'line',
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data['low']),
        },
        {
          name: 'BTC Price',
          type: 'line',
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data['price_btc']),
        },
        {
          name: 'Trend Forecast',
          type: 'line',
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data['trend_forecast']),
        },
        {
          name: 'Up',
          type: 'line',
          smooth: true,
          clip: false,
          lineStyle: {
            width: 2,
          },
          data: Object.values(data['up']),
        },
      ];

      const option = {
        tooltip: {
          formatter: function (params: any[]) {
            const wrapper = document.createElement('div');
            wrapper.className = 'chart-info';
            const axisLabel = document.createElement('label');
            axisLabel.innerHTML = params[0]?.axisValue;

            params.forEach((elem) => {
              wrapper.insertAdjacentHTML(
                'afterbegin',
                `<div><i style="background: ${elem.color}"></i> <p>${elem.seriesName}:</p>  ${
                  elem?.data?.toFixed(2) || '-'
                }</div>`
              );
            });
            wrapper.prepend(axisLabel);

            return wrapper;
          },
          position: 'top',
          trigger: 'axis',
          className: 'chart__tooltip',
          axisPointer: {
            animation: false,
          },
        },
        color,
        dataZoom: [
          {
            throttle: 0,
            type: 'inside',
            xAxisIndex: [0],
            start: 80,
            end: 90,
          },
          {
            throttle: 0,
            type: 'inside',
            yAxisIndex: [0],
            start: 98,
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
              type: 'dashed',
              color: '#efefefa3',
            },
          },
          axisLabel: {
            rotate: window.innerWidth < 576 ? 8 : 0,
            fontSize: 8,
          },
          data: timestamp,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#efefefa3',
            },
          },
          axisLabel: {
            align: 'right',
            margin: window.innerWidth < 876 ? 3 : 12,
            fontSize: 8,
            verticalAlign: 'top',
          },
        },
      };

      const chartDom = refsCollection.current.childNodes[index].querySelector('#graph');
      const myChart = echarts.init(chartDom);

      myChart.setOption(option);
    });

    if (window.innerWidth < 786) {
      setTimeout(() => {
        setCardsVisible('add');
      }, 100);
    }
  }, []);

  if (!graphs) return <div></div>;

  return (
    <div ref={refsCollection} className="investor">
      {graphs?.data?.map((elem, index) => (
        <div className="investor__card" key={index}>
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
            style={{ height: '252px', width: '310px' }}></div>
        </div>
      ))}
      <button
        className={visible ? 'investor__button' : 'investor__button hidden'}
        onClick={() => setCardsVisible('remove')}>
        Показать больше
      </button>
    </div>
  );
};
