import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useSkeleton } from "../../hooks/useSkeleton";
import { useAppSelector } from "../../reducers/hooks.store";
import { timeDifference } from "../../scripts/scripts";
import { UserCardDropDown } from "../Dropdown/UserCardDropDown";
import { Loader } from "./Loader";

export const UserCard: React.FC<{}> = () => {
  const { userData, timeDiff } = useAppSelector((state) => state.userState);
  const { loaded } = useSkeleton(Boolean(userData));
  const userDate = userData?.subscription_date
    .slice(0, 10)
    .split("-")
    .join(".");

  return (
    <div className="header__usercard">
      {loaded ? (
        <div
          className="skeleton-box"
          style={{ width: "60px", height: "60px", marginRight: "14px" }}
        ></div>
      ) : (
        <img
          className="header__usercard-card"
          src="./images/header-coin.svg"
          alt=""
        />
      )}

      {!loaded ? (
        <div>
          <p className="header__usercard-rank">{userData?.tariff}</p>
          <p className="header__usercard-email">{userData?.name}</p>
          <p className="header__usercard-subscription">
            Подписка до:{" "}
            <span
              style={{
                color: timeDiff <= 0 ? "red" : "green",
              }}
            >
              {userDate}
            </span>
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="skeleton-box"
            style={{ width: "73.78px", height: "14px", marginBottom: "4px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "121.75px", height: "14px", marginBottom: "4px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "121.75px", height: "14px" }}
          ></div>
        </div>
      )}
      <UserCardDropDown />
    </div>
  );
};
