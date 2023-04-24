import { ISignal } from '@interface/Signal';

interface ISignalCard {
  signal: ISignal;
  calculator: string;
}

export const SignalCard: React.FC<ISignalCard> = ({ signal, calculator }) => {
  const { t, i18n } = useTranslation('signal');

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
      case 'BREAKEVEN':
        title = t('status.breakeven');
        break;
      default:
        break;
    }

    return {
      color,
      title,
    };
  }, [signal.status, i18n.language]);

  const calculatorRisk = useMemo(() => {
    const { entry_price_range, stop_loss, risk } = signal;

    let allocation = null;

    const toNumber = (str: any) => {
      if (!str) return null;

      const parsed = parseFloat(str.toString().replaceAll(',', '.'));
      if (isValidNumber(parsed)) return parsed;

      return null;
    };

    // Риск на сделку – это доля от депозита, которую вы можете потерять при достижении стоп-лосса.
    // Предположим, у вас $10 000 на счету. Это значит, что в случае достижения стоп-лосса вы можете потерять максимум $30.

    if (entry_price_range.length && stop_loss && calculator) {
      const avarageEnter =
        entry_price_range.reduce((acc: number, x: string) => {
          const toNum = toNumber(x);
          if (toNum) {
            return acc + toNum;
          }
          return acc;
        }, 0) / entry_price_range.length;

      const stopPercent = toNumber(stop_loss);
      const riskPercent = toNumber(risk);

      if (stopPercent && riskPercent) {
        const enterPerStop = (avarageEnter / stopPercent - 1) * 100;
        // console.log({ calculator }, { riskPercent }, { enterPerStop });
        allocation = +calculator * (riskPercent / enterPerStop);
      }
    }

    if (!toNumber(allocation)) {
      allocation = null;
    }

    return allocation;
  }, [calculator, signal]);

  const getPStatus = (status: 'yellow' | 'green' | 'red' | undefined, percent?: string) => {
    switch (status) {
      case 'yellow':
        return (
          <div className="recommend__table-pstatus recommend__table-pstatus--yellow">{percent}</div>
        );
      case 'green':
        return <div className="recommend__table-pstatus recommend__table-pstatus--green"></div>;
      case 'red':
        return <div className="recommend__table-pstatus recommend__table-pstatus--red"></div>;
      default:
        return null;
    }
  };

  return (
    <tr>
      <td className="recommend__table-date recommend__table-light recommend__table-nowrap recommend__hide-mobile">
        {formatDate(signal.date)}
      </td>
      <td className="recommend__table-min">
        <img src={signal.currency_icon} alt={signal.currency} />
      </td>
      <td>
        {signal.currency}
        <div className="recommend__table-type recommend__table-light recommend__table-grey">
          {signal.currency_code}
        </div>
      </td>
      <td
        className={cns(
          'recommend__table-status recommend__table-center',
          signal.direction === 'SHORT' ? 'recommend__table-red' : 'recommend__table-green'
        )}>
        {signal.direction}
      </td>
      <td className={cns('recommend__table-price recommend__table-center', signalStatus.color)}>
        {signalStatus.title}
      </td>
      <td className="recommend__table-center recommend__table-nowrap">
        <ul className="recommend__table-pricelist">
          {signal.entry_price_range.map((item, idx) => (
            <li key={idx}>
              {/* TODO after back updated: getPStatus('yellow', '30%') */}
              {item}{' '}
            </li>
          ))}
        </ul>
      </td>
      <td className="recommend__table-price recommend__table-center recommend__table-nowrap">
        <ul className="recommend__table-pricelist">
          {signal.get_exit_range.map((item, idx) => (
            <li key={idx}>
              {/* TODO after back updated: getPStatus('yellow', '30%') */}
              {item}{' '}
            </li>
          ))}
        </ul>
      </td>
      <td className="recommend__table-stop recommend__table-center recommend__table-nowrap">
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
      <td className="recommend__table-risk recommend__table-center">
        {calculatorRisk !== null ? <>${formatPrice(calculatorRisk)}</> : <>{signal.risk}%</>}
      </td>
    </tr>
  );
};
