import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useSkeleton } from "../../hooks/useSkeleton";
import { useAppSelector } from "../../reducers/hooks.store";
import { timeDifference } from "../../scripts/scripts";
import { UserCardDropDown } from "../Dropdown/UserCardDropDown";
import { Loader } from "./Loader";

export const UserCard: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const [userSubscription, setUserSubscription] = useState<Date | string>("");
  const { loaded } = useSkeleton(Boolean(userData));

  useEffect(() => {
    if (userData) {
      const date = parse(userData.subscription_date, "dd.MM.yyyy", new Date());
      setUserSubscription(date);
    }
  }, [userData]);

  return (
    <div className="header__usercard">
      {loaded  ?           <div
            className="skeleton-box"
            style={{ width: "60px", height: "60px", marginRight: '14px'}}
          ></div> : <img
        className="header__usercard-card"
        src="./images/header-coin.svg"
        alt=""
      />}

      {!loaded ? (
        <div>
          <p className="header__usercard-rank">{userData?.rank}</p>
          <p className="header__usercard-email">{userData?.email}</p>
          <p className="header__usercard-subscription">
            Подписка до:{" "}
            <span
              style={{
                color: timeDifference(userSubscription) <= 0 ? "red" : "green",
              }}
            >
              {userData?.subscription_date}
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
