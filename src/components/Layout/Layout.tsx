import { ForecastGuide } from '@c/Charts';
import { Header } from '@c/Layout/Header';
import { TeletypeWidget } from '@c/Layout/Vendor/Teletype';
import {
  DocsCookies,
  DocsDisclaimer,
  DocsPrivacy,
  DocsTerms,
  ModalInfo,
  TarifWindow,
} from '@c/Modal';
import { Withdraw } from '@c/Partner';
import { PromoByBit, Promocode, PromoDiscount } from '@c/Promo';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

import { ThemeContext } from '@/App';
import { isDevelopmentSite } from '@/core/utils';

import { SignalsGuide } from '../Signal';

interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const ctx = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

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
        {searchParams.get('guide') !== null && <ForecastGuide />}
        {searchParams.get('promocode') !== null && <Promocode />}
        {searchParams.get('withdraw') !== null && <Withdraw />}

        {/* {isDevelopmentSite && <PromoDiscount />} */}
        <PromoByBit />

        <TeletypeWidget />
      </div>
    </>
  );
};
