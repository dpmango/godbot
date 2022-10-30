import React, { Dispatch, SetStateAction } from "react";
import { useSkeleton } from "../../hooks/useSkeleton";

export const TableSwitch: React.FC<{
  investorTable: boolean;
  setInvestorTable: Dispatch<SetStateAction<boolean>>;
}> = ({ investorTable, setInvestorTable }) => {

  return (
    <div className="table__switch">
      <button
        onClick={() => setInvestorTable(false)}
        className={
          !investorTable
            ? "table__switch-button table__switch-button--active"
            : "table__switch-button"
        }
      >
        Трейдинг
      </button>
      <button
        onClick={() => setInvestorTable(true)}
        className={
          investorTable
            ? "table__switch-button disabled table__switch-button--active"
            : "table__switch-button disabled"
        }
      >
        Инвестирование
      </button>
    </div>
  );
};
