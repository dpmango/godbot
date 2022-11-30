import { Helmet } from 'react-helmet';

// import { PaymentLink } from '@c/Payment/PaymentLink';
// import { PaymentSum } from '@c/Payment/PaymentSum';
import { Layout } from '@c/Layout/Layout';
// import '@c/Payment/payment.scss';

export const PaymentPage: React.FC<{}> = () => {
  return (
    <Layout>
      <div className="payment">
        <Helmet>
          <title>Godbot | Payment</title>
        </Helmet>
        <h4 className="payment__title">Реквизиты для оплаты счета:</h4>
        <div className="payment__inner">
          {/* <PaymentLink />
          <PaymentSum /> */}
        </div>
      </div>
    </Layout>
  );
};
