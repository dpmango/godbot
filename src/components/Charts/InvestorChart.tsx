import React, { FC } from "react";
import { useAppSelector } from "../../reducers/hooks.store";

interface IInvestorChartProps {}

export const InvestorChart: FC<IInvestorChartProps> = () => {
  const { graphs } = useAppSelector((state) => state.investorState);

  if (!graphs) return <div></div>;

  return (
    <div>
      {graphs?.map((elem) => (
        <div>{elem.data[0].currency}123</div>
      ))}
    </div>
  );
};
