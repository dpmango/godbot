import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IInvestorCharts, InvestorCharts } from "../Charts/InvestorCharts";

export const TableInvestor: React.FC<{}> = () => {
  const [investorData, setInvestorData] = useState<IInvestorCharts[]>();
  const { getFetch } = useFetch(setInvestorData);

  useEffect(() => {
    getFetch(
      "/investor",
      "POST",
      JSON.stringify({
        key: "31sda$sd#231wfdsS*31)9s",
      }),
      { "Content-Type": "application/json" }
    );
  }, []);

  return (
    <div className="investor">
      <ul className="investor__list">
        {investorData?.length
          ? investorData.map((elem, index) => (
              <InvestorCharts
                key={index}
                series={elem.series}
                title={elem.title}
                icon={elem.icon}
              />
            ))
          : ""}
      </ul>
    </div>
  );
};
