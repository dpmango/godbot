import React, { useRef } from "react";

export const PartnershipSide: React.FC<{}> = () => {
  const referalRef: any = useRef();

  const handleCopy = () => {
    referalRef.current.select();
    document.execCommand("copy");
  }

  return (
    <div className="partnership__side">
      <div className="partnership__referal block">
        <h3 className="partnership__title">Реферальная ссылка</h3>
        <input
          ref={referalRef}
          value="top.fewjofjewokdwdwdopwqkopd/dwfwemdpow/fwefew"
          className="partnership__input"
          type="text"
        />
        <button onClick={handleCopy} className="partnership__copy">
          СКОПИРОВАТЬ
        </button>
      </div>
      <div className="partnership__referal block">
        <h3 className="partnership__title">
          С каждой покупке услуг по Вашей реферальной ссылке вы получаете
        </h3>
        <h3 className="gradient">20%</h3>
        <p className="partnership__text">на свой счет в личном кабинете</p>
      </div>
    </div>
  );
};
