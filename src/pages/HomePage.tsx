import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { api } from '@core';
import { useAppDispatch, getCurrentUser } from '@store';

import { Layout } from '@c/Layout/Layout';
import { ChartsRouter } from '@/components/Charts/ChartsRouter';
import { Signals } from '@c/Signal';

export const HomePage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setTrial = async () => {
    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: 9 },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    await dispatch(getCurrentUser());

    toast.success('Активирована пробная версия');
    Cookies.remove('trial');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (Cookies.get('trial')) {
      setTrial();
    }
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
