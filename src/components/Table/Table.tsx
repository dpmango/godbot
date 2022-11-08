import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {getChartData, IChartObj} from '../../reducers/chartDataSlice.reducer';
import {useAppDispatch, useAppSelector} from '../../reducers/hooks.store';
import {SideAdds} from '../SideAdds/SideAdds';
import {TableSwitch} from './TableSwitch';
import React from 'react';
import '../Charts/chart.scss';
import {Echrt} from '../Charts/Echrt';
import ChartTable from '../Charts/ChartTable';
import {LockScreen} from '../UIelems/LockScreen';
import {getInvestorData} from '../../reducers/investorSlice.reducer';
import {InvestorChart} from '../Charts/InvestorChart';

export const Table: React.FC<{}> = () => {
	const [visible, setVisible] = useState(true);
	const [investorTable, setInvestorTable] = useState(false);
	const [width, setWidth] = useState<string | number>(1073);
	const {data} = useAppSelector((state) => state.chartState);
	const investorData = useAppSelector((state) => state.investorState);
	const {userData, timeDiff} = useAppSelector((state) => state.userState);
	const [chartLines, setChartLines] = useState(data);
	const addsRef: MutableRefObject<any> = useRef();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getChartData('coin=BTC'));
	}, []);

	useEffect(() => {
		setChartLines(data);
	}, [data]);

	const handleClick = () => {
		setVisible(!visible);
	};

	useEffect(() => {
		if (!investorData.graphs.length) {
			dispatch(getInvestorData());
		}
	}, []);

	useEffect(() => {
		if (visible) {
			setWidth(addsRef?.current?.clientWidth - 267);
		} else {
			setTimeout(() => {
				setWidth(addsRef?.current?.clientWidth);
			}, 700);
			setTimeout(() => {
				setWidth('100%');
			}, 800);
		}
	}, [visible]);

	return (
		<div className={!visible ? 'table__wrapper _hidden' : 'table__wrapper'}>
			{userData?.data.tariff && timeDiff ? (
				<TableSwitch investorTable={investorTable} setInvestorTable={setInvestorTable} />
			) : (
				''
			)}
			<div className='table__inner' ref={addsRef}>
				{userData?.data.tariff === null || !timeDiff ? <LockScreen /> : ''}
				<div className={visible ? 'table' : 'table table--hidden'}>
					{userData?.data.tariff === 'New' ? (
						<div className='table__lock'>
							<div>
								<img src='./images/Lock.svg' alt='Lock' />
								<p>Для отображения графика нейронной сети необходимо выбрать тариф</p>
								<Link className='table__link' to={'/payment'}>
									ВЫБРАТЬ ТАРИФ
								</Link>
							</div>
						</div>
					) : (
						''
					)}
					<div style={{display: investorTable ? 'none' : 'flex'}}>
						<ChartTable />
					</div>
					{!investorTable ? <Echrt containerWidth={addsRef.current?.clientWidth} /> : <InvestorChart />}
				</div>
				{/* <SideAdds setVisible={handleClick} visible={visible} /> */}
			</div>
		</div>
	);
};
