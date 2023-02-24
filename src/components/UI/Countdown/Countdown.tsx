import { FC, useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import dayjs from 'dayjs';
import { timeDiff, pad } from '@utils';

interface ICountdownProps {
  toDate?: Date;
}

export const Countdown: FC<ICountdownProps> = ({ toDate }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const timerUpdates: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (toDate) {
      const seconds = dayjs(toDate).unix();
      setSecondsLeft(timeDiff(seconds * 1000));

      timerUpdates.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1 * 1000);
    } else {
      setSecondsLeft(0);
    }

    return () => {
      clearInterval(timerUpdates.current as NodeJS.Timeout);
    };
  }, [toDate]);

  const displayTime = useMemo(() => {
    let hours = '00';
    let minutes = '00';
    let seconds = '00';

    if (secondsLeft) {
      const hoursInt = Math.floor(secondsLeft / (60 * 60));
      const minutesInt = Math.floor((secondsLeft % (60 * 60)) / 60);
      const secondsInt = Math.floor(secondsLeft % 60);

      // console.log({ secondsLeft: secondsLeft / (60 * 60 * 24) }, { hoursInt });

      hours = pad(hoursInt);
      minutes = pad(minutesInt);
      seconds = pad(secondsInt);
    }

    return {
      hours,
      minutes,
      seconds,
    };
  }, [secondsLeft]);

  return (
    <div className="countdown__timer">
      <span className="countdown__num">{displayTime.hours[0]}</span>
      <span className="countdown__num">{displayTime.hours[1]}</span>
      <span className="countdown__dots"></span>
      <span className="countdown__num">{displayTime.minutes[0]}</span>
      <span className="countdown__num">{displayTime.minutes[1]}</span>
      <span className="countdown__dots"></span>
      <span className="countdown__num">{displayTime.seconds[0]}</span>
      <span className="countdown__num">{displayTime.seconds[1]}</span>
    </div>
  );
};
