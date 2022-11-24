import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { SvgIcon } from '@ui';
import { useAppSelector } from '@store';
import './uielems.scss';

interface ILockScreenProps {
  section: string;
}

export const LockScreen: FC<ILockScreenProps> = ({ section }) => {
  const { tariffActive, userData } = useAppSelector((state) => state.userState);
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="ui__lock">
      {userData && (
        <div>
          <SvgIcon name="lock" />

          <h3>
            {!userData?.tariff && `Для отображения ${section} нужно активировать тариф`}
            {userData?.tariff &&
              !tariffActive &&
              `Для отображения ${section} необходимо продлить тариф`}
          </h3>

          <Link to="?tariffs">
            {!userData?.tariff && 'ВЫБРАТЬ ТАРИФ'}
            {userData?.tariff && !tariffActive && 'ПОПРОБОВАТЬ БЕСПЛАТНО'}
          </Link>
        </div>
      )}
    </div>
  );
};
