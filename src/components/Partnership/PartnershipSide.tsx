import React, {useRef} from 'react';
import {PartnershipRaiting} from './PartnershipRating';

export const PartnershipSide: React.FC<{}> = () => {
	const referalRef: any = useRef();

	const handleCopy = () => {
		referalRef.current.select();
		document.execCommand('copy');
	};

	return (
		<div className='partnership__side'>
			<div className='partnership__referal block'>
				<h3 className='partnership__title'>Реферальная ссылка</h3>
				<input
					ref={referalRef}
					value='top.fewjofjewokdwdwdopwqkopd/dwfwemdpow/fwefew'
					className='partnership__input'
					type='text'
				/>
				<button onClick={handleCopy} className='partnership__copy'>
					СКОПИРОВАТЬ
				</button>
			</div>
			<div className='partnership__referal block'>
				<h3 className='partnership__title'>С каждой покупке услуг по Вашей реферальной ссылке вы получаете</h3>
				<strong className='blue'>20%</strong>
				<p className='partnership__text'>на свой счет в личном кабинете</p>
			</div>
			<div className='partnership__referal block'>
				<h3 className='partnership__title'>Индивидуальная партнерская система</h3>
				<ul className='partnership__system'>
					<li className='partnership__card'>
						<p>1 уровень</p>
						<strong>15%</strong>
					</li>
					<li className='partnership__card'>
						<p>2 уровень</p>
						<strong>10%</strong>
					</li>
					<li className='partnership__card'>
						<p>3 уровень</p>
						<strong>7%</strong>
					</li>
					<li className='partnership__card'>
						<p>4 уровень</p>
						<strong>3%</strong>
					</li>
					<li className='partnership__card'>
						<p>5 уровень</p>
						<strong>1%</strong>
					</li>
				</ul>
			</div>
			<PartnershipRaiting />
		</div>
	);
};
