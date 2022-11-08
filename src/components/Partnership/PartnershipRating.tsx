import React, {FC} from 'react';
import {useDropdown} from '../../hooks/useDropdown';

interface IPartnershipRaitingProps {}

export const PartnershipRaiting: FC<IPartnershipRaitingProps> = () => {
	const {handleStateChange, handleChange, value, menuState} = useDropdown('Август');

	return (
		<div className='partnership-raiting block'>
			<h3 className='partnership__title'>Рейтинг партнеров за</h3>
			<div className='partnership-raiting__wrapper'>
				<button className={menuState ? 'partnership-raiting__button' : 'partnership-raiting__button active'} onClick={handleStateChange}>{value}</button>
				<ul className={menuState ? 'partnership-raiting__list' : 'partnership-raiting__list active'}>
					<li onClick={handleChange}>Декабрь</li>
					<li onClick={handleChange}>Август</li>
				</ul>
			</div>
		</div>
	);
};
