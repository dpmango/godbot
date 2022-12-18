import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { IChartLines } from './Forecast';

export const ForecastLegend: React.FC<{
  chartLines: IChartLines[];
  active: boolean;
}> = ({ chartLines, active }) => {
  const [renderer, setRenderer] = useState<number>(0);
  const { t } = useTranslation('forecast');

  const handleVisibilityToggle = useCallback(
    (id: string) => {
      const targetLine = chartLines.find((x) => x.id === id);

      if (targetLine) {
        const { visible } = targetLine.instance.options();
        targetLine.instance.applyOptions({
          visible: !visible,
        });
      }

      setRenderer((prev) => prev + 1);
    },
    [chartLines]
  );

  return (
    <div className={cns('chart__settings-dropdown', active && 'chart__settings-dropdown--active')}>
      <div className="chart__settings-title">{t('legend.title')}</div>
      <div className="chart__settings-checks">
        {chartLines.map((chartLine, index) => {
          // @ts-ignore
          const { visible, color } = chartLine.instance.options();

          return (
            <label
              key={chartLine.id}
              className={cns('chart__legend-item', visible && 'chart__legend-item--active')}>
              <input
                type="checkbox"
                checked={visible}
                onChange={() => handleVisibilityToggle(chartLine.id)}
              />
              <span className="checkbox"></span>
              <span className="chart__settings-line" style={{ borderColor: color }}></span>
              {chartLine.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};
