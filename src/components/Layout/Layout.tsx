import { useContext } from 'react';
import { ThemeContext } from '@/App';
import { Link, useLocation, useParams } from 'react-router-dom';

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

  return (
    <>
      <div className={ctx?.theme ? 'main _black-theme' : 'main'}>
        {params['*'] === 'tarifs' ? <TarifWindow /> : ''}
        <div className="container">
          <Header />
          {children}
        </div>

        {/* <Link
        to={pathname.slice(0, pathname.length - 7)}
        className={params['*'] === 'tarifs' ? 'blur-bg show' : 'blur-bg'}></Link> */}
        {currentModal ? <Greeting /> : ''}

        <TeletypeWidget />
      </div>
    </>
  );
};
