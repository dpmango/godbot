import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../reducers/hooks.store";
import { timeDifference } from "../../scripts/scripts";
import { UserCardDropDown } from "../Dropdown/UserCardDropDown";
import { Loader } from "./Loader";

export const UserCard: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const [userSubscription, setUserSubscription] = useState<Date | string>("");

  useEffect(() => {
    if (userData) {
      const date = parse(userData.subscription_date, "dd.MM.yyyy", new Date());
      setUserSubscription(date);
    }
  }, [userData]);

  if (!userData) return <Loader />;

  return (
    <div className="header__usercard">
      <img
        className="header__usercard-card"
        src="./images/header-coin.svg"
        alt=""
      />
      <div>
        <p className="header__usercard-rank">{userData.rank}</p>
        <p className="header__usercard-email">{userData.email}</p>
        <p className="header__usercard-subscription">
          Подписка до:{" "}
          <span
            style={{
              color: timeDifference(userSubscription) <= 0 ? "red" : "green",
            }}
          >
            {userData.subscription_date}
          </span>
        </p>
      </div>
      <UserCardDropDown />
    </div>
  );
};
