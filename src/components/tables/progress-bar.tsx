'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import clsx from 'clsx';

type ProgressBarProps = {
  value: number; // від 0 до 100
  label?: string; // текст у центрі або ліворуч
  size?: number; // діаметр круга
  thickness?: number; // товщина лінії
  className?: string; // класи контейнера
  labelPosition?: 'inside' | 'left'; // позиція напису
  trackColor?: string; // колір фону круга
  progressColor?: string; // колір активного прогресу
};

export default function ProgressBar({
  value,
  label,
  size = 26,
  thickness = 4,
  className,
  labelPosition = 'left',
  trackColor = '#d4f8d3',
  progressColor = '#2bd627',
}: ProgressBarProps) {
  const circle = (
    <Box
      className="relative flex items-center justify-center"
      sx={{ width: size, height: size }}
    >
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        style={{
          color: trackColor,
          position: 'absolute',
        }}
      />

      {/* Active progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        style={{
          color: progressColor,
        }}
      />

      {labelPosition === 'inside' && (
        <span className="absolute  font-medium text-black leading-none">
          {label ?? `${Math.round(value)}%`}
        </span>
      )}
    </Box>
  );

  if (labelPosition === 'left') {
    return (
      <div
        className={clsx('flex items-center justify-center md:gap-2', className)}
      >
        <span className="hidden md:block md:text-lg md:font-medium text-black">
          {label ?? `${Math.round(value)}%`}
        </span>
        {circle}
      </div>
    );
  }

  return <div className={className}>{circle}</div>;
}
