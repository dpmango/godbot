import Cookies from 'js-cookie';
import { useLayoutEffect, useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { TarifWindow } from '@c/ModalsWindow/TarifWindow';
import { Table } from '@c/Table/Table';
import { Transaction } from '@c/Transaction/Transaction';
import { useAppDispatch, useAppSelector } from '@store/hooks.store';
import { Helmet } from 'react-helmet';
import { getCurrentUser } from '@store/userFetchSlice.reducer';

export const HomePage: React.FC<{}> = () => {
  const { userData } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Cookies.get('auth')) {
      navigate('/auth/registration');
    }
  }, []);

  const setTrial = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}activate_tariff/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' as string,
        'X-CSRFToken': Cookies.get('csrftoken') as string,
      },
      body: JSON.stringify({ id: 9 }),
    });

    if (resp.ok) {
      Cookies.remove('trial');
      setTimeout(() => {
        window.location = '/' as Location | (string & Location);
      }, 500);
    } else {
      Cookies.remove('trial');
      window.location = '/error' as Location | (string & Location);
    }
  };

  useLayoutEffect(() => {
    if (Cookies.get('trial') && params['*'] !== 'error') {
      setTrial();
    } else {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Godbot | Home</title>
      </Helmet>
      <Table />
      <Transaction />
    </>
  );
};
