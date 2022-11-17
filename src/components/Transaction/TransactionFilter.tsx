import * as React from 'react';
import { useDropdown } from '@hooks/useDropdown';
import '../Charts/chart.scss';

interface IAppProps {
  filter: (value: string) => void;
  isSelected: (value: boolean) => void;
}

const TransactionFilter: React.FunctionComponent<IAppProps> = ({ filter, isSelected }) => {
  const { menuState, handleStateChange, setValue, value } = useDropdown('Активно');
  const handleClick = (value: string) => {
    handleStateChange();
    filter(value);
    isSelected(true);
    setValue(value ? value : 'Показать все');
  };

  return (
    <div className="recomendation__select">
      <button
        onClick={handleStateChange}
        className={
          !menuState
            ? 'chart__dropdown-button'
            : 'chart__dropdown-button chart__dropdown-button--active'
        }>
        Показать все
      </button>
      <div
        className={
          !menuState
            ? 'chart__dropdown-wrapper'
            : 'chart__dropdown-wrapper chart__dropdown-wrapper--active'
        }>
        <ul>
          {[
            'Активно | Active',
            'В ожидании | Waiting',
            'Отменено | Cancel',
            'Закрыта по стопу | Loss',
            'Закрыто в прибыль | Profit',
          ].map((elem: string, index) => (
            <li onClick={() => handleClick(elem)} key={index}>
              {elem.split('|')[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TransactionFilter };
