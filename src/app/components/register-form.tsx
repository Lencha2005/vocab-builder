'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { register } from '@/redux/auth/operation';
import { useState } from 'react';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must contain at least 6 letters and 1 number'
    )
    .required('Password is required'),
});

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await dispatch(register(data)).unwrap();
      // Після успішної реєстрації редірект:
      window.location.href = '/dictionary';
    } catch (error) {
      alert(`Registration error: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...formRegister('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...formRegister('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          {...formRegister('password')}
        />
        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Register
      </button>
    </form>
  );
}
