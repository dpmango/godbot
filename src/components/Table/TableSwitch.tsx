import React, { Dispatch, SetStateAction } from "react";
import { useSkeleton } from "../../hooks/useSkeleton";
import { useAppSelector } from "../../reducers/hooks.store";
import { checkOnPro } from "../../scripts/scripts";

export const TableSwitch: React.FC<{
  investorTable: boolean;
  setInvestorTable: Dispatch<SetStateAction<boolean>>;
}> = ({ investorTable, setInvestorTable }) => {
  const { userData } = useAppSelector((state) => state.userState);

  return (
    <div
      className={
        userData?.data?.allowed_functions?.includes("Investing") ||
        checkOnPro(userData)
          ? "table__switch"
          : "table__switch pro"
      }
    >
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
