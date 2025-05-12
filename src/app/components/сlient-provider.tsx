'use client';

import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { useEffect } from 'react';
import { refreshUser } from '@/redux/auth/operations';

function InitAuth() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return null;
}

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InitAuth />
      {children}
    </Provider>
  );
}
