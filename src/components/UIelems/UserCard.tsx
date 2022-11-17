import { format, parse } from 'date-fns';
import { toDate } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useSkeleton } from '@hooks/useSkeleton';
import { useAppSelector } from '@store/hooks.store';
import { isValidDate, timeDifference } from '@utils/scripts';
import { UserCardDropDown } from '@c/Dropdown/UserCardDropDown';
import { Loader } from './Loader';

export const UserCard: React.FC<{}> = () => {
  const { userData, timeDiff } = useAppSelector((state) => state.userState);
  const { loaded } = useSkeleton(Boolean(userData));
  const userDate = isValidDate(userData, 'ua-UK');

  return (
    <div className="header__usercard">
      {loaded ? (
        <div
          className="skeleton-box"
          style={{ width: '60px', height: '60px', marginRight: '14px' }}></div>
      ) : (
        <img className="header__usercard-card" src="./images/header-coin.svg" alt="" />
      )}

      {!loaded ? (
        <div>
          <p
            className="header__usercard-rank"
            style={{ display: userData?.data.tariff ? 'block' : 'none' }}>
            {userData?.data.tariff}
          </p>
          <p className="header__usercard-email">{userData?.data.name}</p>
          <p
            className="header__usercard-subscription"
            style={{ display: userData?.data.tariff ? 'block' : 'none' }}>
            Подписка до:{' '}
            <span
              style={{
                color: timeDiff ? 'red' : '#339987',
              }}>
              {userDate}
            </span>
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className="skeleton-box"
            style={{ width: '73.78px', height: '14px', marginBottom: '4px' }}></div>
          <div
            className="skeleton-box"
            style={{ width: '121.75px', height: '14px', marginBottom: '4px' }}></div>
          <div className="skeleton-box" style={{ width: '121.75px', height: '14px' }}></div>
        </div>
      )}
      <UserCardDropDown />
    </div>
  );
};
