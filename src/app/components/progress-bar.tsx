import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span className="font-medium xs:text-xs sm:text-sm md:text-lg xl:text-xl text-black aline-top">{`${Math.round(value)}%`}</span>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {/* background track */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={26}
          thickness={4}
          sx={{
            color: '#d4f8d3',
            position: 'absolute',
            left: 0,
          }}
        />
        {/* active progress */}
        <CircularProgress
          variant="determinate"
          value={value}
          size={26}
          thickness={4}
          sx={{
            color: '#2bd627',
          }}
        />
      </Box>
    </Box>
  );
}
