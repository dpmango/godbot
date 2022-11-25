import { Dispatch, SetStateAction } from 'react';
import cns from 'classnames';
import { useAppSelector } from '@store';

export const ChartTabs: React.FC<{
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}> = ({ activeTab, setActiveTab }) => {
  const { userData } = useAppSelector((state) => state.userState);

  return (
    <div
      className={cns(
        'table__switch',
        !userData?.allowed_functions?.includes('Investing') && 'pro'
      )}>
      <button
        onClick={() => setActiveTab('Forecast')}
        className={cns(
          'table__switch-button',
          activeTab === 'Forecast' && 'table__switch-button--active'
        )}>
        <p>Трейдинг</p>
      </button>

      <button
        onClick={() => setActiveTab('Investing')}
        className={cns(
          'table__switch-button',
          activeTab === 'Investing' && 'table__switch-button--active'
        )}>
        <p>Инвестирование</p>
      </button>
    </div>
  );
};
