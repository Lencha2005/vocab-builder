'use client';

import TrainingRoom from '@/components/forms/training-room';
import TrainingEmpty from '@/components/ui/training-empty';
// import { ProgressBar } from '@/components/tables/progress-bar';
import { useProtectRoute } from '@/lib/hooks/use-protect-route';
import { AppDispatch } from '@/redux/store';
import { getTasks } from '@/redux/userWords/operations';
import { selectTasks } from '@/redux/userWords/selectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Training() {
  const { isLoading, status } = useProtectRoute();

  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getTasks());
    }
  }, [dispatch, status]);

  // if (!tasks.length) {
  //     return <TrainingEmpty />;
  //   }

  if (isLoading) return null;

  return (
    <>
      {tasks.length === 0 ? (
        <TrainingEmpty />
      ) : (
        <div className="pt-6 px-4 pb-19">
          {/* <ProgressBar value={dictionary} /> */}
          <TrainingRoom tasks={tasks} />
        </div>
      )}
    </>
  );
}
