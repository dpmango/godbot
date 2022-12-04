import { useContext } from 'react';
import { ThemeContext } from '@/App';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import cns from 'classnames';

import { useAppSelector } from '@core';

import { Header } from '@c/Layout/Header';
import { TarifWindow, Activated } from '@c/Modals';
import { Greeting } from '@/components/Modals/Greeting/Greeting';
import { TeletypeWidget } from '@/components/Layout/Vendor/Teletype';

interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const { currentModal } = useAppSelector((state) => state.modalState);
  let ctx = useContext(ThemeContext);
  const { pathname } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className={cns('mainwrap', ctx?.theme ? 'themeDark' : 'themeLight')}>
        <Header />
        {children}

        {searchParams.get('tariffs') !== null && <TarifWindow />}
        {searchParams.get('activated') !== null && <Activated />}

        <TeletypeWidget />
      </div>
    </>
  );
};
