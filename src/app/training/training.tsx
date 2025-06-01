'use client';

import React, { useEffect, useState } from 'react';
import { useProtectRoute } from '@/lib/hooks/use-protect-route';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getTasks, getAllUserWords } from '@/redux/userWords/operations';
import { selectFullUserItems, selectTasks } from '@/redux/userWords/selectors';
import { AnswerWordDto, TaskWord } from '@/types';
import { AnswerResponse } from '@/types';
import { useMediaQuery } from '@mui/material';
import ProgressBar from '@/components/tables/progress-bar';
import TrainingRoom from '@/components/forms/training-room';
import WellDoneModal from '@/components/modals/well-done-modal';
import TrainingEmpty from '@/components/ui/training-empty';

export default function Training() {
  console.count('Render Training');
  const { isLoading, status } = useProtectRoute();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswerWordDto[]>([]);
  const [results, setResults] = useState<AnswerResponse[] | null>(null);
  const [direction, setDirection] = useState<'ua' | 'en' | null>(null);
  const [showModal, setShowModal] = useState(false);

  const userWords = useSelector(selectFullUserItems);
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (direction !== null || tasks.length === 0) return;
    const hasUa = tasks.some(task => task.task === 'ua');
    const hasEn = tasks.some(task => task.task === 'en');
    const newDirection = hasUa ? 'ua' : hasEn ? 'en' : 'ua';

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

  const isTablet = useMediaQuery('(min-width: 768px)');
  const progress = (answers.length / filteredTasks.length) * 100;

  if (direction === null || isLoading) return null;

  const handleComplete = (res: AnswerResponse[]) => {
    setResults(res);
    setShowModal(true);
  };

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
        <div className="relative max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] pt-[76px] px-4 pb-19 md:pt-[136px] md:px-8 md:pb-[102px] xl:px-[100px]  mx-auto">
          <ProgressBar
            value={progress}
            label={`${progress}`}
            size={isTablet ? 58 : 44}
            labelPosition="inside"
            trackColor="#ffffff"
            progressColor="#85aa9f"
            className="absolute top-6 right-4 md:top-[62px] md:right-8 xl:right-[100px]"
          />

          <TrainingRoom
            tasks={filteredTasks}
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleComplete}
            direction={direction}
            setDirection={setDirection}
          />
        </div>
      )}

      {showModal && results && (
        <WellDoneModal
          results={results}
          onClose={() => {
            setShowModal(false);
            // router.push('/dictionary');
          }}
        />
      )}
    </>
  );
}
