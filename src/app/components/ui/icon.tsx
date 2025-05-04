'use client';

import React from 'react';
import clsx from 'clsx';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size, className }: IconProps) {
  return (
    <svg width={size} height={size} className={clsx('fill-current', className)}>
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
