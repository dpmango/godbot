import { useContext } from 'react';
import { ThemeContext } from '@/App';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import cns from 'classnames';

import { useAppSelector } from '@core';

import { Header } from '@c/Layout/Header';
import {
  TarifWindow,
  ModalInfo,
  DocsPrivacy,
  DocsTerms,
  DocsCookies,
  DocsDisclaimer,
} from '@c/Modals';
import { TeletypeWidget } from '@/components/Layout/Vendor/Teletype';

interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  let ctx = useContext(ThemeContext);
  const { pathname } = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className={cns('mainwrap', ctx?.theme ? 'themeDark' : 'themeLight')}>
        <Header />
        {children}

        {searchParams.get('tariffs') !== null && <TarifWindow />}
        {searchParams.get('activated') !== null && <ModalInfo name="activated" />}
        {searchParams.get('success') !== null && <ModalInfo name="paymentAwait" />}
        {searchParams.get('privacy') !== null && <DocsPrivacy />}
        {searchParams.get('terms') !== null && <DocsTerms />}
        {searchParams.get('cookies') !== null && <DocsCookies />}
        {searchParams.get('disclaimer') !== null && <DocsDisclaimer />}

        <TeletypeWidget />
      </div>
    </>
  );
};
