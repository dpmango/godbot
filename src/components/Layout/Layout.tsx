import { ForecastGuide, SimGuide } from '@c/Charts';
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

import { ThemeContext } from '@/App';

interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const ctx = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    const requestNotifications = async () => {
      dispatch(getNotifications());
    };

    requestNotifications();
    timerConfirm.current = setInterval(requestNotifications, 5 * 60 * 1000);

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

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
        {searchParams.get('simguide') !== null && <SimGuide />}
        {searchParams.get('promocode') !== null && <Promocode />}
        {searchParams.get('withdraw') !== null && <Withdraw />}
        {/* {isDevelopmentSite && <PromoDiscount />}  */}
        {/* <PromoByBit /> */}
        <TeletypeWidget />
      </div>
    </>
  );
};
