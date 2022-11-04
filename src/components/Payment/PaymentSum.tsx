import { RefObject, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  operationId: string;
};

export const PaymentSum: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [value, setValue] = useState(0.0023513);
  const [wallet, setWallet] = useState("1DewfedD1245FedfwW5Fsfwfmkmdqwm423");

  const sumRef = useRef<HTMLInputElement>(null);
  const walletRef = useRef<HTMLInputElement>(null);

  const handleCopy = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.select();
    }

    document.execCommand("copy");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className="payment__form">
        <div className="payment__wrapper payment__wrapper--form">
          {["sum", "wallet"].map((elem) => (
            <div>
              <h4 className="payment__label">
                {elem === "sum" ? "Сумма" : "Кошелёк"}
              </h4>
              <input
                ref={elem === "sum" ? sumRef : walletRef}
                className="payment__input"
                defaultValue={elem === "sum" ? value : wallet}
                readOnly
                type="text"
              />
              <button
                className="payment__copy"
                onClick={() => handleCopy(elem === "sum" ? sumRef : walletRef)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 2.75C0 1.23122 1.23122 0 2.75 0H10.75C12.2688 0 13.5 1.23122 13.5 2.75V4H14.75C16.2688 4 17.5 5.23122 17.5 6.75V14.75C17.5 16.2688 16.2688 17.5 14.75 17.5H6.75C5.23122 17.5 4 16.2688 4 14.75V13.5H2.75C1.23122 13.5 0 12.2688 0 10.75V2.75ZM6.75 4C5.23122 4 4 5.23122 4 6.75V11.75C4 12.1642 4.33579 12.5 4.75 12.5C5.16421 12.5 5.5 12.1642 5.5 11.75V6.75C5.5 6.05964 6.05964 5.5 6.75 5.5H11.75C12.1642 5.5 12.5 5.16421 12.5 4.75C12.5 4.33579 12.1642 4 11.75 4H6.75Z"
                    fill="#4572ee"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="payment__wallet">
          <img src="./images/qr-code.svg" alt="Wallet link" />
          <p>
            Для совершения платежа отправьте USDT на указанный адрес кошелька.
          </p>
        </div>
        <div className="payment__txid">
          <p className="payment__label">Введите TXID операции</p>
          <form
            className="payment__operation"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              style={{
                borderColor: errors.operationId?.message ? "red" : "#CCC5FF",
              }}
              className="payment__input"
              type="text"
              {...register("operationId", {
                required: {
                  value: true,
                  message: "Заполните это поле!",
                },
              })}
            />
            <p
              className={
                errors.operationId?.message
                  ? "payment__error active"
                  : "payment__error"
              }
            >
              Это поле обязательное!
            </p>
            <button className="payment__submit">Я ОПЛАТИЛ</button>
          </form>
        </div>
      </div>
    </>
  );
};
