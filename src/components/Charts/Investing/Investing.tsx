import { InvestingCard } from '@c/Charts';

import { placeholderInvesting } from './placeholderData';

interface IInvestingProps {}

export const Investing: React.FC<IInvestingProps> = () => {
  const { graphs } = useAppSelector((state) => state.investorState);
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const { allowedFunctions } = useProfile();

  const displayGrid = useMemo(() => {
    const userAccessLevel = userData?.access_level || 0;

    if (userAccessLevel < 3) {
      if (graphs?.data) {
        const visibleGraphs =
          graphs.data.filter(({ access_level }) => access_level <= userAccessLevel) || [];
        const fillPlaceholders = placeholderInvesting.slice(visibleGraphs.length, 8);
        return [...visibleGraphs, ...fillPlaceholders];
      } else {
        return placeholderInvesting;
      }
    }

    return graphs?.data || [];
  }, [graphs?.data, userData?.access_level]);

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (allowedFunctions.investing) {
      dispatch(getInvesting());
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.investing]);

  return (
    <div className="investing investing--active">
      <div className="investing__grid">
        {displayGrid?.map((investing, index) => (
          <InvestingCard {...investing} key={index} />
        ))}
      </div>
    </div>
  );
};
