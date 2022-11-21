import { FC } from 'react';
import { Link } from 'react-router-dom';

import { SvgIcon } from '@ui';
import { useAppSelector } from '@store';
import './uielems.scss';

interface ILockScreenProps {
  section: string;
}

export const LockScreen: FC<ILockScreenProps> = ({ section }) => {
  const { tariffActive, userData } = useAppSelector((state) => state.userState);

  return (
    <div className="ui__lock">
      <div>
        <SvgIcon name="lock" />

        <h3>
          {!userData?.tariff && `Для отображения ${section} нужно активировать тариф`}
          {userData?.tariff &&
            !tariffActive &&
            `Для отображения ${section} необходимо продлить тариф`}
        </h3>

        <Link to={'/tarifs'}>
          {!userData?.tariff && 'ВЫБРАТЬ ТАРИФ'}
          {userData?.tariff && !tariffActive && 'ПОПРОБОВАТЬ БЕСПЛАТНО'}
        </Link>
      </div>
    </div>
  );
};
