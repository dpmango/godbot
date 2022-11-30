import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { formatPrice, formatDate } from '@utils';
import { ISignal } from '@interface/Signal';

interface ISignalCard {
  signal: ISignal;
}

export const SignalCard: React.FC<ISignalCard> = ({ signal }) => {
  const { t } = useTranslation('signal');

  const signalStatus = useMemo(() => {
    let color = '';
    let title = '';

    switch (signal.status) {
      case 'ACTIVE':
        title = t('status.active');
        break;
      case 'WAITING':
        title = t('status.waiting');
        color = 'recommend__table-yellow';
        break;
      case 'CANCEL':
        title = t('status.cancel');
        color = 'recommend__table-red';
        break;
      case 'PROFIT':
        title = t('status.profit');
        color = 'recommend__table-green';
        break;
      case 'LOSS':
        title = t('status.loss');
        color = 'recommend__table-red';
        break;
      default:
        break;
    }

    return {
      color,
      title,
    };
  }, [signal.status]);

  return (
    <tr>
      <td className="recommend__table-light recommend__table-nowrap recommend__hide-mobile">
        {formatDate(signal.date)}
      </td>
      <td className="recommend__table-min">
        <img src={signal.currency_icon} alt={signal.currency} />
      </td>
      <td>
        {signal.currency}
        <div className="recommend__table-light recommend__table-grey">{signal.currency_code}</div>
      </td>
      <td
        className={cns(
          'recommend__table-center',
          signal.direction === 'SHORT' ? 'recommend__table-red' : 'recommend__table-green'
        )}>
        {signal.direction}
      </td>
      <td className={cns('recommend__table-center', signalStatus.color)}>{signalStatus.title}</td>
      <td className="recommend__table-center recommend__table-nowrap">
        {signal.entry_price_range.map((item, idx) => (
          <div key={idx}>${item}</div>
        ))}
      </td>
      <td className="recommend__table-center recommend__table-nowrap">
        {signal.get_exit_range.map((item, idx) => (
          <div key={idx}>${item}</div>
        ))}
      </td>
      <td className="recommend__table-center recommend__table-nowrap">
        <div>
          {signal.stop_loss ? (
            <>
              ${formatPrice(signal.stop_loss)}{' '}
              {signal.trigger_stop && <sup>{signal.trigger_stop}</sup>}
            </>
          ) : (
            '-'
          )}
        </div>
      </td>
      <td className="recommend__table-center">{signal.risk}%</td>
    </tr>
  );
};
