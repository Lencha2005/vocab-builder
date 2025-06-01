'use client';

import { WordItem } from '../../types/word';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateWordById } from '@/redux/userWords/operations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import toast from 'react-hot-toast';
import CustomModal from '../ui/custom-modal';
import InputField from '../ui/input-field';
import Button from '../ui/button';
import Icon from '../ui/icon';

type EditWordModalProps = {
  word: WordItem;
  onClose: () => void;
};

const schema = z.object({
  ua: z
    .string()
    .regex(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Введіть слово українською мовою'
    ),
  en: z
    .string()
    .regex(/^[A-Za-z][A-Za-z'\- ]*$/, 'Введіть слово англійською мовою'),
});

type WordEditInputs = z.infer<typeof schema>;

export default function EditWordModal({ word, onClose }: EditWordModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WordEditInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      en: word.en,
      ua: word.ua,
    },
  });
  const onSubmit = async (data: WordEditInputs) => {
    try {
      await dispatch(
        updateWordById({
          id: word._id!,
          formData: {
            ...data,
            category: word.category,
            isIrregular: word.isIrregular,
          },
        })
      ).unwrap();
      toast.success('Слово успішно відредаговано');
      reset();
      onClose();
    } catch {
      toast.error('Помилка при редагуванні слова');
    }
  };

  return (
    <CustomModal isOpen={true} onClose={onClose} showCloseIcon>
      <div className="py-12 px-4 md:py-16 md:px-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:gap-[18px] mb-4"
        >
          <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-8">
            <InputField
              type="text"
              placeholder="Трохи, трішки"
              {...register('ua')}
              error={errors.ua}
              variant="white"
              className="md:w-[354px]"
            />
            <label className="flex items-center text-white text-sm font-medium md:text-base">
              <Icon
                name="icon-ukraine"
                className="w-7 h-7 md:w-8 md:h-8 mr-2"
              />
              Ukrainian
            </label>
          </div>
          <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-8">
            <InputField
              type="text"
              placeholder="A little bit"
              {...register('en')}
              error={errors.en}
              variant="white"
              className="md:w-[354px]"
            />
            <label className="flex items-center text-white text-sm font-medium md:text-base">
              <Icon
                name="icon-united-kingdom"
                className="w-7 h-7 md:w-8 md:h-8 mr-2"
              />
              English
            </label>
          </div>
          <div className="flex gap-2 md:gap-[10px] mt-4 md:mt-[14px]">
            <Button
              variant="white"
              type="submit"
              className="p-3 md:p-[14px] mt-[18px] md:mt-[14px]"
            >
              Save
            </Button>
            <Button
              variant="transparent-1"
              type="button"
              className="p-3 md:p-[14px] mt-[18px] md:mt-[14px]"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
}
