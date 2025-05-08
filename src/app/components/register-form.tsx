'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { registerUser } from '@/redux/auth/operation';
// import { selectErrorUser } from '@/redux/auth/selectors';
import Icon from './ui/icon';
import clsx from 'clsx';

// interface RegisterFormInputs {
//   name: string;
//   email: string;
//   password: string;
// }

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
  //   const error = useSelector(selectErrorUser);

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
      const result = await dispatch(registerUser(data)).unwrap();
      console.log('result success: ', result);
      reset();
      router.push('/dictionary');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Registration error: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[14px] md:gap-[18px] mb-4"
    >
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className={clsx(
            'w-full  rounded-[15px] px-[18px] py-4 placeholder-black outline-hidden',
            errors.name ? 'border border-red-500' : 'border border-black-10',
            'hover:border-green-dark focus:border-green-dark active:border-green-dark'
          )}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('email')}
          placeholder="Email"
          className={clsx(
            'w-full  rounded-[15px] px-[18px] py-4 placeholder-black outline-hidden',
            errors.email ? 'border border-red-500' : 'border border-black-10',
            'hover:border-green-dark focus:border-green-dark active:border-green-dark'
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          className={clsx(
            'w-full  rounded-[15px] px-[18px] py-4 placeholder-black outline-hidden',
            errors.password
              ? 'border border-red-500'
              : 'border border-black-10',
            'hover:border-green-dark focus:border-green-dark active:border-green-dark'
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute top-[18px] right-[18px]"
        >
          {showPassword ? (
            <Icon
              name="icon-eye"
              className="w-[20px] h-[20px] fill-transparent stroke-black"
            />
          ) : (
            <Icon
              name="icon-eye-off"
              className="w-[20px] h-[20px] fill-transparent stroke-black"
            />
          )}
        </button>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="md:text-lg font-bold text-white w-full py-4 bg-green-dark rounded-[30px] mt-[18px] md:mt-[14px] cursor-pointer hover:bg-green-light focus:bg-green-light"
      >
        Register
      </button>
    </form>
  );
}
