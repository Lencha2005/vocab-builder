import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// import InputField from '../ui/input-field';
import { addAnswers } from '@/redux/userWords/operations';
import { AnswerResponse, AnswerWordDto } from '@/types';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Icon from '../ui/icon';
import { useRouter } from 'next/navigation';
import Button from '../ui/button';

type TrainingRoomProps = {
  tasks: {
    _id: string;
    ua: string;
    task: 'en';
  }[];
};

const schema = z.object({
  answer: z
    .string()
    .min(1, 'Введіть переклад')
    .regex(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Невалідний формат'),
});

type WordTaskInputs = z.infer<typeof schema>;

export default function TrainingRoom({ tasks }: TrainingRoomProps) {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerWordDto[]>([]);
  const [results, setResults] = useState<AnswerResponse[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WordTaskInputs>({
    resolver: zodResolver(schema),
  });

  const currentTask = tasks[currentIndex];

  const handleNext = (data: WordTaskInputs) => {
    if (data.answer.trim() !== '') {
      setAnswers(prev => [
        ...prev,
        {
          _id: currentTask._id,
          ua: currentTask.ua,
          en: data.answer.trim(),
          task: currentTask.task,
        },
      ]);
    }

    reset();

    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const onSubmit = async (data: WordTaskInputs) => {
    const finalAnswers = [...answers];

    if (data.answer.trim() !== '') {
      finalAnswers.push({
        _id: currentTask._id,
        ua: currentTask.ua,
        en: data.answer.trim(),
        task: currentTask.task,
      });
    }

    try {
      const result = await dispatch(addAnswers(finalAnswers)).unwrap();
      setResults(result);
    } catch {
      toast.error('Не вдалося зберегти результат');
      router.push('/dictionary');
    }
  };

  const visibleWord = currentTask.ua;
  console.log('currentTask: ', currentTask);
  console.log('visibleWord: ', visibleWord);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col rounded-lg mb-[116px]">
        <div className="relative h-[195px] bg-white p-5 border-b border-b-gray">
          <div className="relative">
            <input
              type="text"
              placeholder="Введіть переклад"
              {...register('answer')}
              className="bg-transparent p-0 font-medium placeholder-black  border-transparent outline-transparent"
            />
            {errors.answer && (
              <span className="absolute top-5 left-0 text-red-500 text-xs">
                {errors.answer.message}
              </span>
            )}
          </div>
          {/* <div className="flex justify-between"> */}
          <button
            type="button"
            onClick={handleSubmit(handleNext)}
            className="absolute bottom-5 left-5 flex gap-2 items-center text-black-50 font-medium hover:text-green-dark"
          >
            Next{' '}
            <Icon
              name="icon-switch-horizontal"
              className="w-5 h-5 stroke-green-dark"
            />
          </button>
          <span className="absolute bottom-5 right-5 flex gap-2 items-center font-medium text-sm md:text-base">
            {' '}
            <Icon name="icon-ukraine" className="w-7 h-7 md:w-8 md:h-8" />
            Ukrainian
          </span>
        </div>
        <div className="relative h-[195px] bg-white p-5">
          <p>{visibleWord}</p>
          <span className="absolute bottom-5 right-5 flex gap-2 items-center font-medium text-sm md:text-base">
            <Icon
              name="icon-united-kingdom"
              className="w-7 h-7 md:w-8 md:h-8 "
            />
            English
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
          className="p-4 md:p-[14px] md:w-[203px]"
        >
          Cancel
        </Button>
      </div>
      {/* </div> */}
    </form>
  );
}

{
  /* <div className="w-full flex justify-end">
          {currentIndex < tasks.length - 1 ? (
            <button type="button" onClick={handleSubmit(handleNext)}>
              Next
            </button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>

      {results && (
        <WellDoneModal
          results={results}
          onClose={() => {
            setResults(null);
            router.push('/dictionary');
          }}
        />
      )}
    </>
  );
} */
}
