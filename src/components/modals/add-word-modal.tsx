'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createWord } from '@/redux/dictionary/operations';
import { getUserWords } from '@/redux/userWords/operations';
import { FiltersState } from '@/types';
import toast from 'react-hot-toast';
import CustomModal from '../ui/custom-modal';
import CustomSelect from '../ui/custom-select';
import InputField from '../ui/input-field';
import Icon from '../ui/icon';
import Button from '../ui/button';

type AddWordModalProps = {
  onClose: () => void;
  filters: FiltersState;
  page: number;
  limit: number;
};

const schema = z.object({
  ua: z
    .string()
    .regex(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Invalid Ukrainian word format'
    ),
  en: z
    .string()
    .regex(
      /\b[A-Za-z,'-]+(?:\s+[A-Za-z,'-]+)*\b/,
      'Invalid English word format'
    ),
});

type AddWordInputs = z.infer<typeof schema>;

export default function AddWordModal({
  onClose,
  filters,
  page,
  limit,
}: AddWordModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState<string>('noun');
  const [isIrregular, setIsIrregular] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddWordInputs>({
    resolver: zodResolver(schema),
  });

  const handleSelect = (value: string) => {
    setCategory(value);
    if (value.toLowerCase() !== 'verb') {
      setIsIrregular(null);
    }
  };

  const handleIrregularChange = (value: boolean) => {
    setIsIrregular(value);
  };

  const onSubmit = async (data: AddWordInputs) => {
    try {
      const wordPayload = {
        ...data,
        category,
        ...(category === 'verb' && typeof isIrregular === 'boolean'
          ? { isIrregular }
          : {}),
      };

      await dispatch(createWord(wordPayload)).unwrap();

      await dispatch(
        getUserWords({
          category: filters.category,
          isIrregular: filters.isIrregular,
          keyword: filters.search,
          page,
          limit,
        })
      );

      toast.success('Word added successfully');
      reset();
      onClose();
    } catch (error) {
      if (error && typeof error === 'string' && error.includes('409')) {
        toast.error('This word already exists in your dictionary');
      } else {
        toast.error('Failed to add word');
      }
    }
  };

  return (
    <CustomModal isOpen={true} onClose={onClose} showCloseIcon>
      <div className="py-12 px-4 md:px-16">
        <h2 className="font-semibold text-2xl md:text-[40px] text-white md:mb-5">
          Add word
        </h2>
        <p className="text-sm md:text-xl text-white mb-4 md:mb-8">
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomSelect
            selected={category}
            onSelect={handleSelect}
            isIrregular={isIrregular}
            onIrregularChange={handleIrregularChange}
            variant="modal"
          />

          <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-8 mt-8 md:mt-[38px]">
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

          <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-8 mt-4 md:mt-[18px]">
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

          <div className="flex gap-2 md:gap-[10px] mt-8">
            <Button variant="white" type="submit" className="p-3 md:p-[14px]">
              Add
            </Button>
            <Button
              variant="transparent-1"
              type="button"
              className="p-3 md:p-[14px]"
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
