import { useDropdown } from '@hooks';
import cns from 'classnames';

import '../Charts/chart.scss';

interface IAppProps {
  filter: (value: string) => void;
  isSelected: (value: boolean) => void;
}

const SignalsFilter: React.FC<IAppProps> = ({ filter, isSelected }) => {
  const { menuState, handleStateChange, setValue, value } = useDropdown('Активно');
  const handleClick = (value: string) => {
    handleStateChange();
    filter(value);
    isSelected(true);
    setValue(value ? value : 'Показать все');
  };

  return (
    <div className="signals__select">
      <button
        onClick={handleStateChange}
        className={cns('chart__dropdown-button', menuState && 'chart__dropdown-button--active')}>
        Показать все
      </button>
      <div
        className={cns('chart__dropdown-wrapper', menuState && 'chart__dropdown-wrapper--active')}>
        <ul>
          {[
            'Активно | Active',
            'В ожидании | Waiting',
            'Отменено | Cancel',
            'Закрыта по стопу | Loss',
            'Закрыто в прибыль | Profit',
          ].map((elem: string, idx) => (
            <li onClick={() => handleClick(elem)} key={idx}>
              {elem.split('|')[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { SignalsFilter };
