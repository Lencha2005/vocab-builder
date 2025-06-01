'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addAnswers,
  getTasks,
  getAllUserWords,
} from '@/redux/userWords/operations';
import { AnswerResponse, AnswerWordDto, TaskWord } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Icon from '../ui/icon';
import Button from '../ui/button';

type TrainingRoomProps = {
  tasks: TaskWord[];
  answers: AnswerWordDto[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerWordDto[]>>;
  onComplete: (value: AnswerResponse[]) => void;
  direction: 'en' | 'ua';
  setDirection: React.Dispatch<React.SetStateAction<'ua' | 'en' | null>>;
};

type WordTaskInputs = {
  answer: string;
};

const schema = (direction: 'ua' | 'en') => {
  const regex =
    direction === 'ua'
      ? /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u // Ukrainian
      : /\b[A-Za-z,'-]+(?:\s+[A-Za-z,'-]+)*\b/; // English

  return z.object({
    answer: z
      .string()
      .min(1, 'Введіть переклад')
      .regex(regex, 'Невалідний формат'),
  });
};

export default function TrainingRoom({
  tasks,
  answers,
  setAnswers,
  onComplete,
  direction,
  setDirection,
}: TrainingRoomProps) {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WordTaskInputs>({
    resolver: zodResolver(schema(direction)),
  });

  const filteredTasks = tasks.filter(task => task.task === direction);
  const currentTask = filteredTasks[currentIndex];

  if (!currentTask) {
    return null;
  }

  const isUaToEn = direction === 'ua';

  const visibleWord = isUaToEn
    ? currentTask.en?.toLowerCase()
    : currentTask.ua?.toLowerCase();

  const handleNext = async (data: WordTaskInputs) => {
    const userAnswer = data.answer.toLowerCase().trim();
    if (!userAnswer) return;

    const answer: AnswerWordDto = {
      _id: currentTask._id,
      ua: isUaToEn ? userAnswer : currentTask.ua,
      en: isUaToEn ? currentTask.en : userAnswer,
      task: direction,
    };

    const finalAnswers = [...answers, answer];
    setAnswers(finalAnswers);
    reset();

    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      try {
        const result = await dispatch(addAnswers(finalAnswers)).unwrap();
        await dispatch(getAllUserWords());
        await dispatch(getTasks());
        onComplete(result);
      } catch {
        toast.error('Не вдалося зберегти результат');
        router.push('/dictionary');
      }
    }
  };

  const key = direction;

  return (
    <>
      <div className="flex justify-center mb-4">
        <button
          type="button"
          onClick={() => {
            setCurrentIndex(0);
            setAnswers([]);
            setDirection(prev => (prev === 'ua' ? 'en' : 'ua'));
          }}
        >
          Змінити напрямок: {direction === 'ua' ? 'UA → EN' : 'EN → UA'}
        </button>
      </div>

      <form key={key} onSubmit={handleSubmit(handleNext)}>
        <div className="flex flex-col xl:flex-row rounded-lg mb-[116px] md:border-[18px] md:border-white-true">
          <div
            className="relative h-[195px] md:h-[282px] xl:h-[302px] xl:w-[602px]
          bg-white p-[22px] border-b border-b-gray xl:border-b-0 xl:border-r xl:border-r-gray"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Введіть переклад"
                {...register('answer')}
                className="font-medium md:text-[20px] bg-transparent p-0 placeholder-black  border-transparent outline-transparent"
              />
              {errors.answer && (
                <span className="absolute top-[22px] left-[22px] text-red-500 text-xs">
                  {errors.answer.message}
                </span>
              )}
            </div>
            {currentIndex < filteredTasks.length - 1 && (
              <button
                type="button"
                onClick={handleSubmit(handleNext)}
                className="absolute bottom-[22px] left-[22px] flex gap-2 items-center text-black-50 font-medium hover:text-green-dark transition-colors"
              >
                Next{' '}
                <Icon
                  name="icon-switch-horizontal"
                  className="w-5 h-5 stroke-green-dark"
                />
              </button>
            )}
            <span className="absolute bottom-[22px] right-[22px] md:bottom-auto md:top-[22px] flex gap-2 items-center font-medium text-sm md:text-base">
              {' '}
              <Icon
                name={isUaToEn ? 'icon-ukraine' : 'icon-united-kingdom'}
                className="w-7 h-7 md:w-8 md:h-8"
              />
              {isUaToEn ? 'Ukrainian' : 'English'}
            </span>
          </div>
          <div className="relative h-[195px] md:h-[282px] xl:h-[302px] xl:w-[602px] bg-white p-[22px]">
            <p className="font-medium md:text-[20px]">{visibleWord}</p>
            <span className="absolute bottom-[22px] right-[22px] md:bottom-auto md:top-[22px] flex gap-2 items-center font-medium text-sm md:text-base">
              <Icon
                name={isUaToEn ? 'icon-united-kingdom' : 'icon-ukraine'}
                className="w-7 h-7 md:w-8 md:h-8 "
              />
              {isUaToEn ? 'English' : 'Ukrainian'}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-[10px] ">
          <Button type="submit" className="p-4 md:p-[14px] md:w-[203px]">
            Save
          </Button>
          <Button
            type="button"
            variant="transparent-2"
            onClick={() => router.push('/dictionary')}
            className="p-4 md:p-[14px] md:w-[203px]"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
