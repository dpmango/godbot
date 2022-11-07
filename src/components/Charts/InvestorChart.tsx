import React, {FC, useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {useAppSelector} from '../../reducers/hooks.store';

interface IInvestorChartProps {}

export const InvestorChart: FC<IInvestorChartProps> = () => {
	const {graphs} = useAppSelector((state) => state.investorState);
	const refsCollection: any = useRef();
  
	useEffect(() => {
		graphs.forEach(async (elem, index) => {
			const graph: any = null;
			const resp = await fetch('./inv.json');
			const data = await resp.json();
			console.log(data);

			const color = ['#3182bd', '#1c9099', '#43a2ca', '#9ebcda'];

			const series = [
				{
					name: 'Low',
					type: 'line',
					smooth: true,
					clip: false,
					lineStyle: {
						width: 2
					},
					data: Object.values(data['low'])
				},
				{
					name: 'BTC Price',
					type: 'line',
					smooth: true,
					clip: false,
					lineStyle: {
						width: 2
					},
					data: Object.values(data['price_btc'])
				},
				{
					name: 'Trend Forecast',
					type: 'line',
					smooth: true,
					clip: false,
					lineStyle: {
						width: 2
					},
					data: Object.values(data['trend_forecast'])
				},
				{
					name: 'Up',
					type: 'line',
					smooth: true,
					clip: false,
					lineStyle: {
						width: 2
					},
					data: Object.values(data['up'])
				}
			];

			const option = {
				tooltip: {
					position: 'top',
					trigger: 'item',
					className: 'chart__tooltip'
				},
				color,
				dataZoom: [
					{
						throttle: 0,
						type: 'inside',
						xAxisIndex: [0],
						start: 50,
						end: 60
					},
					{
						throttle: 0,
						type: 'inside',
						yAxisIndex: [0],
						start: 90,
						end: 100
					}
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
            fontSize: window.innerWidth < 576 ? 9 : 12,
          },
          data: Object.values(data['time_list_forecast'])
        },
				yAxis: {
					type: 'value',
					splitLine: {
						show: true,
						lineStyle: {
							type: 'dashed',
							color: '#efefefa3'
						}
					},
					axisLabel: {
						align: 'right',
						margin: window.innerWidth < 876 ? 3 : 12,
						fontSize: window.innerWidth < 576 ? 9 : 12,
						verticalAlign: 'top'
					}
				}
			};

			const chartDom = refsCollection.current.childNodes[index].querySelector('#graph');
			const myChart = echarts.init(chartDom);

			myChart.setOption(option);
		});
	}, []);

	if (!graphs) return <div></div>;

	return (
		<div ref={refsCollection}>
			{graphs?.map((elem) => (
				<div>
					<div>
						<img src={elem.data[0].currency_icon} alt={elem.data[0].currency + ' icon'} />
						<p>
							{elem.data[0].currency}
							<span>{elem.data[0].currency.slice(0, 3).toUpperCase()}</span>
						</p>
					</div>
					<div id='graph' style={{height: '300px', width: '253px'}}></div>
				</div>
			))}
		</div>
	);
};
