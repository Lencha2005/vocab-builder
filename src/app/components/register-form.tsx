'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { registerUser } from '@/redux/auth/operation';
import { Toaster, toast } from 'react-hot-toast';
import InputField from './input-field';
import Button from './ui/button';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/, 'Error password'),
});

type RegisterFormInputs = z.infer<typeof schema>;

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await dispatch(registerUser(data)).unwrap();
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
          type="text"
          placeholder="Name"
          register={register('name')}
          error={errors.name}
        />

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
          type="submit"
          variant="green"
          disabled={isSubmitting}
          className="mt-[18px] md:mt-[14px]"
        >
          Register
        </Button>
      </form>
      <Toaster position="top-center" />
    </>
  );
}
