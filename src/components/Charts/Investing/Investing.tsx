import { FC, useEffect, useRef, useState, useContext } from 'react';

import { useAppSelector } from '@store';

import { InvestingChart } from '@c/Charts';

interface IInvestingProps {}

export const Investing: FC<IInvestingProps> = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const { graphs } = useAppSelector((state) => state.investorState);

  const refsCollection: any = useRef();

  const setCardsVisible = (method: string) => {
    for (let i = 4; i < refsCollection.current.childNodes.length; i++) {
      refsCollection.current.childNodes[i].classList[method]('mob-hidden');
    }

    if (method === 'remove') {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 786) {
      setTimeout(() => {
        setCardsVisible('add');
      }, 100);
    }
  });

  if (!graphs) return <div></div>;

  return (
    <div ref={refsCollection} className="investor">
      {graphs?.data?.map((investing, index) => (
        <div className="investor__card" key={index}>
          <div className="investor__wrapper">
            <img src={investing.currency_icon} />
            <p>
              {investing.currency}
              <span>{investing.currency.slice(0, 3).toUpperCase()}</span>
            </p>
          </div>
          <InvestingChart id={investing.invest_id} />
        </div>
      ))}
      <button
        className={visible ? 'investor__button' : 'investor__button hidden'}
        onClick={() => setCardsVisible('remove')}>
        Показать больше
      </button>
    </div>
  );
};
