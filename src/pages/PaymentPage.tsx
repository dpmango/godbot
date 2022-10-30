import { PaymentLink } from "../components/Payment/PaymentLink";
import "../components/Payment/payment.scss";
import { PaymentSum } from "../components/Payment/PaymentSum";
import { Helmet } from "react-helmet";

export const PaymentPage: React.FC<{}> = () => {
  return (
    <div className="payment">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Payment</title>
      </Helmet>
      <h4 className="payment__title">Реквизиты для оплаты счета:</h4>
      <div className="payment__inner">
        <PaymentLink />
        <PaymentSum />
      </div>
    </div>
  );
};
