import { Dispatch, SetStateAction } from 'react';
import { useSkeleton } from '@hooks/useSkeleton';
import { useAppSelector } from '@store/hooks.store';
import { checkOnPro } from '@utils/scripts';

export const TableSwitch: React.FC<{
  investorTable: boolean;
  setInvestorTable: Dispatch<SetStateAction<boolean>>;
}> = ({ investorTable, setInvestorTable }) => {
  const { userData } = useAppSelector((state) => state.userState);

  return (
    <div
      className={
        userData?.data?.allowed_functions?.includes('Investing') || checkOnPro(userData)
          ? 'table__switch'
          : 'table__switch pro'
      }>
      <button
        onClick={() => setInvestorTable(false)}
        className={
          !investorTable
            ? 'table__switch-button table__switch-button--active'
            : 'table__switch-button'
        }>
        <p>Трейдинг</p>
      </button>
      <button
        onClick={() => setInvestorTable(true)}
        className={
          investorTable
            ? 'table__switch-button table__switch-button--active'
            : 'table__switch-button'
        }>
        <p>Инвестирование</p>
      </button>
    </div>
  );
};
