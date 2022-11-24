import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '@utils';
import { ISignal } from '@interface/Signal';

interface ISignalCard {
  signal: ISignal;
}

export const SignalCard: React.FC<ISignalCard> = ({ signal }) => {
  const { t } = useTranslation('signal');

  const signalStatus = useMemo(() => {
    let color = '#262628';
    let title = '';

    switch (signal.status) {
      case 'ACTIVE':
        title = t('status.active');
        color = '#262628';
        break;
      case 'WAITING':
        title = t('status.waiting');
        color = '#EFAD10';
        break;
      case 'CANCELLED':
        title = t('status.cancelled');
        color = '#CA390C';
        break;
      case 'PROFIT':
        title = t('status.profit');
        color = '#339987';
        break;
      case 'LOSS':
        title = t('status.loss');
        color = '#CA390C';
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
      <td className="signal-date">{signal.date}</td>
      <td>
        <div className="signal-coin">
          <img src={signal.currency_icon} alt={signal.currency} />
          <div className="signal-coin__description">
            <p>{signal.currency}</p>
            {/* <small>{signal.currency}</small> */}
          </div>
        </div>
      </td>
      <td
        style={{
          color: signal.direction === 'SHORT' ? '#CA390C' : '#339987',
        }}>
        {signal.direction}
      </td>
      <td style={{ color: signalStatus.color }}>{signalStatus.title}</td>
      <td>
        <span>
          {signal.entry_price_range.map((item, idx) => (
            <p key={idx}>${item}</p>
          ))}
        </span>
      </td>
      <td>
        <span>
          {signal.get_exit_range.map((item, idx) => (
            <p key={idx}>${item}</p>
          ))}
        </span>
      </td>
      <td className="signal-stoploss">${formatPrice(signal.stop_loss)}</td>
      <td>{signal.risk}%</td>
    </tr>
  );
};
