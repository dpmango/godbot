import { InvestingChart } from '@c/Charts';
import { IInvesting } from '@interface/Investor';
import { LockScreen } from '@ui';

interface ICardProps extends IInvesting {}

export const InvestingCard: React.FC<ICardProps> = ({
  invest_id,
  currency,
  currency_icon,
  currency_code,
  datetime,
  direction,
  isPlaceholder,
}) => {
  const { graphs } = useAppSelector((state) => state.investorState);
  const { isProUser, userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation('investing');

  return (
    <div className="investing__block">
      <div className="investing__name">
        <img src={currency_icon} />
        <strong>{currency}</strong> <span>{currency_code}</span>
        {direction && (
          <div
            className={cns(
              'investing__name-type',
              direction === 'LONG' && 'investing__name-type--green',
              direction === 'SHORT' && 'investing__name-type--red'
            )}>
            {direction}
          </div>
        )}
      </div>

      {!isPlaceholder ? (
        <InvestingChart id={invest_id} />
      ) : (
        <LockScreen section={t('lock') as string} postText={t('lockPost') as string} />
      )}
    </div>
  );
};
