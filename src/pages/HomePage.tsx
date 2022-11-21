import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { api } from '@core';

import { Layout } from '@c/Layout/Layout';
import { Table } from '@c/Table/Table';
import { Transaction } from '@c/Transaction/Transaction';

export const HomePage: React.FC<{}> = () => {
  const params = useParams();
  const navigate = useNavigate();

  const setTrial = async () => {
    const { data, error } = await api('activate_tariff/', {
      method: 'POST',
      body: { id: 9 },
    });

    if (data) {
      Cookies.remove('trial');
      navigate('/', { replace: true });
    } else {
      Cookies.remove('trial');
      navigate('/error', { replace: true }); // TODO - what's error route?
    }
  };

  useLayoutEffect(() => {
    if (Cookies.get('trial') && params['*'] !== 'error') {
      setTrial();
    }
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Home</title>
      </Helmet>

      <Table />
      <Transaction />
    </Layout>
  );
};
