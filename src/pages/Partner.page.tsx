import { Layout } from '@c/Layout/Layout';
import { PartnerBalance, PartnerList, PartnerSide } from '@c/Partner';
import { Helmet } from 'react-helmet';

export const Partner = () => {
  const { allowedFunctions } = useProfile();
  const dispatch = useAppDispatch();

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    const requestPartners = async () => {
      dispatch(getPartnership());
    };

    requestPartners();
    timerConfirm.current = setInterval(requestPartners, 10 * 60 * 1000);

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Partnership</title>
      </Helmet>

      <div className="content">
        <div className="container">
          <PartnerBalance />

          <div className="partnership__grid">
            <PartnerList />
            <PartnerSide />
          </div>
        </div>
      </div>
    </Layout>
  );
};
