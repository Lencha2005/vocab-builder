'use client';

import TrainingRoom from '@/components/forms/training-room';
import WellDoneModal from '@/components/modals/well-done-modal';
import TrainingEmpty from '@/components/ui/training-empty';
import { ProgressBar } from '@/components/tables/progress-bar';
import { useProtectRoute } from '@/lib/hooks/use-protect-route';
import { AppDispatch } from '@/redux/store';
import { getTasks, getAllUserWords } from '@/redux/userWords/operations';
import { selectFullUserItems, selectTasks } from '@/redux/userWords/selectors';
import { AnswerWordDto, TaskWord } from '@/types';
import { AnswerResponse } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Training() {
  console.count('Render Training');
  const { isLoading, status } = useProtectRoute();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswerWordDto[]>([]);

  const [results, setResults] = useState<AnswerResponse[] | null>(null);
  const [direction, setDirection] = useState<'ua' | 'en' | null>(null);

  const userWords = useSelector(selectFullUserItems);
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (direction !== null || tasks.length === 0) return;
    const hasUa = tasks.some(task => task.task === 'ua');
    const hasEn = tasks.some(task => task.task === 'en');
    const newDirection = hasUa ? 'ua' : hasEn ? 'en' : 'ua';

    // ❗ встановлюй тільки якщо змінилось
    if (direction !== newDirection) {
      setDirection(newDirection);
    }
  }, [tasks, direction]);

  useEffect(() => {
    if (status === 'authenticated' && userWords.length === 0) {
      dispatch(getAllUserWords());
      dispatch(getTasks());
    }
  }, [dispatch, status, userWords.length]);

  const progressMap = new Map(
    userWords.map(word => [word._id, word.progress ?? 0])
  );

  const filteredTasks: TaskWord[] = tasks.filter(task => {
    const progress = progressMap.get(task._id);
    return progress !== undefined && progress < 100 && task.task === direction;
  });

  const progress = (answers.length / filteredTasks.length) * 100;

  if (direction === null || isLoading) return null;

  if (results) {
    return (
      <WellDoneModal
        results={results}
        onClose={() => {
          router.push('/dictionary');
        }}
      />
    );
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <TrainingEmpty />
      ) : (
        <div className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] pt-6 px-4 pb-19 md:pt-[62px] md:px-8 md:pb-[102px] xl:px-[100px]  mx-auto">
          <ProgressBar value={progress} />
          <TrainingRoom
            tasks={filteredTasks}
            answers={answers}
            setAnswers={setAnswers}
            onComplete={setResults}
            direction={direction}
            setDirection={setDirection}
          />
        </div>
      )}
    </>
  );
}
