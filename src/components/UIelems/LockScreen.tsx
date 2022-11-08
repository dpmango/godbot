import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks.store";
import './uielems.scss'

interface ILockScreenProps {}

export const LockScreen: FC<ILockScreenProps> = () => {
  const { timeDiff, userData } = useAppSelector((state) => state.userState);
  return (
    <div className="ui__lock">
      <div>
        <svg
          width="29"
          height="31"
          viewBox="0 0 29 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.3714 11.7297V6.28378C22.3714 2.81335 19.5892 0 16.1571 0H12.8429C9.4108 0 6.62857 2.81335 6.62857 6.28378V11.7297H4.55714C2.0403 11.7297 0 13.7928 0 16.3378V26.3919C0 28.9369 2.0403 31 4.55714 31H24.4429C26.9597 31 29 28.9369 29 26.3919V16.3378C29 13.7928 26.9597 11.7297 24.4429 11.7297H22.3714ZM12.8429 2.51351C10.7836 2.51351 9.11429 4.20152 9.11429 6.28378V11.7297H19.8857V6.28378C19.8857 4.20152 18.2164 2.51351 16.1571 2.51351H12.8429ZM15.7429 19.6892C15.7429 18.9951 15.1864 18.4324 14.5 18.4324C13.8136 18.4324 13.2571 18.9951 13.2571 19.6892V23.0405C13.2571 23.7346 13.8136 24.2973 14.5 24.2973C15.1864 24.2973 15.7429 23.7346 15.7429 23.0405V19.6892Z"
            fill="#262628"
          />
        </svg>
        <h3>
          {(!timeDiff && !userData?.data.tariff) || userData?.data.tariff
            ? "Для отображения графика нейронной сети необходимо продлить тариф"
            : "Для отображения графика нейронной сети нужно активировать тариф"}
        </h3>
        <Link to={"/tarifs"}>ПОПРОБОВАТЬ БЕСПЛАТНО</Link>
      </div>
    </div>
  );
};
