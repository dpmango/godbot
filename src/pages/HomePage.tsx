import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { api } from '@core';
import { useAppDispatch, getCurrentUser } from '@store';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@c/Charts';
import { Signals } from '@c/Signal';

export const HomePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setTrial = async () => {
    const { data: trialData, error: trialError } = await api('get_trial/', {});

    if (trialError) {
      toast.error(trialError.message);
      return;
    }

    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: trialData.trial_id },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Активирована пробная версия');
    Cookies.remove('trial');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (Cookies.get('trial')) {
      setTrial();
    }
  }, []);

  // проверка оплаченных тарифов
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    timerConfirm.current = setTimeout(() => {
      dispatch(getCurrentUser());
    }, 10000);

    return () => {
      clearTimeout(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <ChartsRouter />
      <Signals />
    </Layout>
  );
};
