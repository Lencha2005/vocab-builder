'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { loginUser } from '@/redux/auth/operations';
import { Toaster, toast } from 'react-hot-toast';
import InputField from './ui/input-field';
import Button from './ui/button';

const schema = z.object({
  email: z
    .string()
    .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/, 'Error password'),
});

type LoginFormInputs = z.infer<typeof schema>;

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      reset();
      router.push('/dictionary');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[14px] md:gap-[18px] mb-4"
      >
        <InputField
          type="email"
          placeholder="Email"
          register={register('email')}
          error={errors.email}
        />

        <InputField
          type="password"
          placeholder="Password"
          register={register('password')}
          error={errors.password}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(prev => !prev)}
        />
        <Button
          variant="green"
          type="submit"
          disabled={isSubmitting}
          className="mt-[18px] md:mt-[14px]"
        >
          Login
        </Button>
      </form>
      <Toaster position="top-center" />
    </>
  );
}
