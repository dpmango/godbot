import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
interface IButton {
  title: string;
  active: boolean;
}

interface ISeries {
  name: string;
  type: string;
}

export const ForecastLegend: React.FC<{
  colors: string[];
  data: ISeries[];
  active: boolean;
  handleToggle: (title: string, active: boolean) => void;
}> = ({ colors, data, active, handleToggle }) => {
  const [buttons, setButtons] = useState<IButton[]>([]);

  const { t } = useTranslation('forecast');

  const handleClickToggle = (title: string) => {
    let newState = null;

    setButtons((btns) =>
      btns.map((x) => {
        if (x.title === title) {
          x.active = !x.active;
          newState = !x.active;
        }
        return x;
      })
    );

    handleToggle(title, !!newState);
  };

  useEffect(() => {
    if (data.length && !buttons.length) {
      const initialBtns = data.map((elem) => ({ title: elem.name, active: true }));
      setButtons([...initialBtns]);
    }
    // TODO - any need in update (series are constant)
  }, [data]);

  return (
    <div className={cns('chart__settings-dropdown', active && 'chart__settings-dropdown--active')}>
      <div className="chart__settings-title">{t('legend.title')}</div>
      <div className="chart__settings-checks">
        {buttons.map((elem, index) => (
          <label
            key={elem.title}
            onClick={() => handleClickToggle(elem.title)}
            className={cns('chart__legend-item', elem.active && 'chart__legend-item--active')}>
            <input
              type="checkbox"
              checked={elem.active}
              onChange={() => handleClickToggle(elem.title)}
            />
            <span className="checkbox"></span>
            <span className="chart__settings-line" style={{ borderColor: colors[index] }}></span>
            {elem.title}
          </label>
        ))}
      </div>
    </div>
  );
};
