import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Icon from './ui/icon';
import clsx from 'clsx';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}

export default function InputField({
  type = 'text',
  placeholder,
  register,
  error,
  showPassword,
  toggleShowPassword,
  ...rest
}: InputFieldProps) {
  const isPassword = type === 'password';

  return (
    <div className="relative">
      <input
        type={
          isPassword && showPassword !== undefined
            ? showPassword
              ? 'text'
              : 'password'
            : type
        }
        placeholder={placeholder}
        {...register}
        {...rest}
        className={clsx(
          'w-full  rounded-[15px] px-[18px] py-4 placeholder-black outline-hidden',
          error ? 'border border-red-500' : 'border border-black-10',
          'hover:border-green-dark focus:border-green-dark active:border-green-dark'
        )}
      />
      {isPassword && toggleShowPassword && (
        <button
          type="button"
          onClick={() => toggleShowPassword}
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
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
