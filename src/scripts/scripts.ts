import { toDate } from "date-fns-tz";

function timeDifference(date: any) {
  let now: any = new Date();

  let diff = date - now;
  return Math.round(diff / 1000);
}

const checkOnPro = (userData: any) => {
  return userData?.tariff?.toLocaleLowerCase().includes("pro");
};

const isValidDate = (userData: any, countryFormat: string) => {
  const date = new Date(userData?.subscription_date as string);
  const clonedDate = toDate(date, { timeZone: "Europe/Paris" });
  return clonedDate?.toLocaleDateString(countryFormat);
};

export { timeDifference, checkOnPro, isValidDate };
