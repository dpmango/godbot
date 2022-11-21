import { useLayoutEffect, useState } from 'react';
import { useFetch } from '@hooks';

interface IWinrate {
  winrate: number;
}

export const Winrate: React.FC<{}> = () => {
  const [winrate, setWinrate] = useState<IWinrate | null>(null);
  const { getFetch } = useFetch(setWinrate);

  useLayoutEffect(() => {
    getFetch('/winrateToday');
  }, []);

  return (
    <div className="winrate">
      Винрейт: <span>{`${!winrate?.winrate ? 0 : winrate?.winrate}%`}</span>
    </div>
  );
};
