import { useContext } from 'react';
import { ThemeContext } from '@/App';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import cns from 'classnames';

import { useAppSelector } from '@store';

import { Header } from '@c/Layout/Header';
import { TarifWindow } from '@c/Modals';
import { Greeting } from '@/components/Modals/Greeting/Greeting';
import { TeletypeWidget } from '@/components/Layout/Vendor/Teletype';

import './layout.scss';
interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const { currentModal } = useAppSelector((state) => state.modalState);
  let ctx = useContext(ThemeContext);
  const params = useParams();
  const { pathname } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className={cns('main', ctx?.theme && '_black-theme')}>
        {searchParams.get('tariff') !== null && <TarifWindow />}

        <div className="container">
          <Header />
          {children}
        </div>

        <Link
          to={pathname}
          className={cns('blur-bg', searchParams.get('tariff') !== null && 'show')}
        />
        {currentModal ? <Greeting /> : ''}

        <TeletypeWidget />
      </div>
    </>
  );
};
