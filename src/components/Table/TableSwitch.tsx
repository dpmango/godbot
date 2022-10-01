import React, { Dispatch, SetStateAction } from 'react'

export const TableSwitch: React.FC<{
  investorTable: boolean;
  setInvestorTable: Dispatch<SetStateAction<boolean>>
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
            ? "table__switch-button table__switch-button--active"
            : "table__switch-button"
        }
      >
        Инвестирование
      </button>
    </div>
  );
};
