import { useEffect, useState, useRef } from 'react';
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
  handleToggle: (title: string, active: boolean) => void;
}> = ({ colors, data, handleToggle }) => {
  const settingRef: any = useRef();
  const [active, setActive] = useState(false);
  const [buttons, setButtons] = useState<IButton[]>([]);

  useEffect(() => {
    if (data.length) {
      setButtons(data.map((elem) => Object.assign({}, { title: elem.name, active: true })));
    }
  }, [data]);

  const handleClick = (title: string) => {
    let newState = null;

    setButtons(
      buttons.map((elem) => {
        if (elem.title === title) {
          elem.active = !elem.active;
          newState = !elem.active;
        }
        return elem;
      })
    );

    handleToggle(title, !!newState);
  };

  return (
    <>
      <button className="chart__settings" ref={settingRef} onClick={() => setActive(!active)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.3117C12 1.58727 11.4127 1 10.6883 1H9.3117C8.58727 1 8 1.58727 8 2.3117V2.56876C8 2.99658 7.71288 3.36825 7.31776 3.53229V3.53229C6.9225 3.6964 6.46228 3.63386 6.15966 3.33123L5.883 3.05458C5.30058 2.47215 4.35628 2.47215 3.77385 3.05458L3.05457 3.77386C2.47215 4.35628 2.47215 5.30058 3.05457 5.883L3.33123 6.15966C3.63386 6.46229 3.6964 6.9225 3.53229 7.31776V7.31776C3.36825 7.71288 2.99658 8 2.56877 8H2.3117C1.58727 8 1 8.58727 1 9.3117V10.6883C1 11.4127 1.58727 12 2.3117 12H2.71977C3.05799 12 3.35266 12.2259 3.47549 12.5411V12.5411C3.59352 12.8439 3.53726 13.1906 3.30742 13.4205L2.98904 13.7389C2.4428 14.2851 2.4428 15.1707 2.98904 15.717L3.95388 16.6818C4.43687 17.1648 5.21995 17.1648 5.70294 16.6818L5.74745 16.6373C6.12347 16.2613 6.69986 16.1978 7.18671 16.4117V16.4117C7.65509 16.6175 8 17.0609 8 17.5725V17.6883C8 18.4127 8.58727 19 9.3117 19H10.6883C11.4127 19 12 18.4127 12 17.6883V17.4312C12 17.0034 12.2871 16.6317 12.6822 16.4677V16.4677C13.0775 16.3036 13.5377 16.3661 13.8403 16.6688L13.9274 16.7559C14.3695 17.198 15.0863 17.198 15.5284 16.7559L16.7559 15.5284C17.198 15.0863 17.198 14.3695 16.7559 13.9274L16.6688 13.8403C16.3661 13.5377 16.3036 13.0775 16.4677 12.6822V12.6822C16.6317 12.2871 17.0034 12 17.4312 12H17.6883C18.4127 12 19 11.4127 19 10.6883V9.3117C19 8.58727 18.4127 8 17.6883 8H17.5725C17.0609 8 16.6175 7.65509 16.4117 7.18671V7.18671C16.1978 6.69986 16.2613 6.12347 16.6373 5.74745L16.6818 5.70295C17.1648 5.21996 17.1648 4.43689 16.6818 3.95391L15.7169 2.98904C15.1707 2.44281 14.2851 2.44281 13.7389 2.98904L13.4205 3.30742C13.1906 3.53726 12.8439 3.59352 12.5411 3.47549V3.47549C12.2259 3.35266 12 3.05799 12 2.71976V2.3117ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={cns('chart__legend-blur', active && 'chart__legend-blur--active')} />
      <div className={active ? 'chart__legend chart__legend--active' : 'chart__legend'}>
        <div className="chart__legend-head">
          <p className="chart__legend-title">Trading Legend</p>
          <button className="chart__legend-close" onClick={() => setActive(!active)}>
            <p>&times;</p>
          </button>
        </div>
        <ul className="chart__legend-list">
          {buttons.length ? (
            buttons.map((elem, index) => (
              <li
                key={elem.title}
                onClick={() => handleClick(elem.title)}
                className={cns('chart__legend-item', elem.active && 'chart__legend-item--active')}>
                <button></button>
                <div style={{ background: colors[index] }}></div>
                <p>{elem.title}</p>
              </li>
            ))
          ) : (
            <p>Loading</p>
          )}
        </ul>
      </div>
    </>
  );
};