import { Route, Routes } from "react-router-dom";
import { TarifWindow } from "../components/ModalsWindow/TarifWindow";
import { Table } from "../components/Table/Table";
import { Transaction } from "../components/Transaction/Transaction";

export const HomePage: React.FC<{}> = () => {
  return (
    <>
      <Table />
      <Transaction />
      <Routes>
        <Route path="tarifs" element={<TarifWindow />}></Route>
      </Routes>
    </>
  );
};
