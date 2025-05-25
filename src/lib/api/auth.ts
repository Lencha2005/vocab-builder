import { signIn } from 'next-auth/react';

export async function loginUser(data: { email: string; password: string }) {
  return await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(
    'https://vocab-builder-backend.p.goit.global/api/users/signup',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  return res;
}
