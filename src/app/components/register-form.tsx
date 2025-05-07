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
    .regex(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must contain at least 6 letters and 1 number'
    ),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className="placeholder-black text-base"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          placeholder="Email"
          className="placeholder-black text-base"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          className="placeholder-black text-base"
        />
        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
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
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Register
      </button>
    </form>
  );
}
