import { useSkeleton } from '@hooks';
import { useAppSelector } from '@store';
import { isValidDate } from '@utils';

import { UserCardDropdown } from '@c/Layout/Dropdown';

export const UserCard: React.FC<{}> = () => {
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const { loading } = useSkeleton(!!userData);
  const userDate = isValidDate(userData, 'ua-UK');

  return (
    <div className="header__usercard">
      {loading && (
        <>
          <div
            className="skeleton-box"
            style={{ width: '60px', height: '60px', marginRight: '14px' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className="skeleton-box"
              style={{ width: '73.78px', height: '14px', marginBottom: '4px' }}></div>
            <div
              className="skeleton-box"
              style={{ width: '121.75px', height: '14px', marginBottom: '4px' }}></div>
            <div className="skeleton-box" style={{ width: '121.75px', height: '14px' }}></div>
          </div>
        </>
      )}

      {!loading && (
        <>
          <img className="header__usercard-card" src="./images/header-coin.svg" alt="" />
          <div>
            <p
              className="header__usercard-rank"
              style={{ display: userData?.tariff ? 'block' : 'none' }}>
              {userData?.tariff}
            </p>
            <p className="header__usercard-email">{userData?.name}</p>
            <p
              className="header__usercard-subscription"
              style={{ display: userData?.tariff ? 'block' : 'none' }}>
              Подписка до:{' '}
              <span
                style={{
                  color: tariffActive ? '#339987' : 'red',
                }}>
                {userDate}
              </span>
            </p>
          </div>
        </>
      )}

      <UserCardDropdown />
    </div>
  );
};
