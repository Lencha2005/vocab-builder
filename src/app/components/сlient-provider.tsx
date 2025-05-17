'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { useEffect } from 'react';
import { refreshUser } from '@/redux/auth/operations';
import { selectIsRefreshing } from '@/redux/auth/selectors';

function InitAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Refreshing user...</div>;
  }

  return <>{children}</>;
}

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InitAuth>{children}</InitAuth>
    </Provider>
  );
}
