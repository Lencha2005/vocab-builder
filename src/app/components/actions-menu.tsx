'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Icon from './ui/icon';
import { Box } from '@mui/material';

type ActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ActionsMenu({ onEdit, onDelete }: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon className="rotate-90" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '15px',
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 47px 0 rgba(18,20,23,0.08)',
              //   minWidth: 117,
              bgcolor: 'white',
              fontFamily: 'inherit',
            },
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap="8px">
          <MenuItem
            onClick={() => {
              onEdit();
              handleClose();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              p: 0,
              alignItems: 'center',
              minHeight: '16px',
              fontSize: {
                xs: '14px',
                md: '16px',
              },
              fontWeight: 500,

              '&:hover': {
                color: '#85aa9f',
                backgroundColor: 'transparent',
                '& svg': {
                  stroke: '#85aa9f',
                },
              },
            }}
          >
            <Icon
              name="icon-edit"
              className="w-[16px] h-[16px] fill-transparent stroke-black-50  "
            />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete();
              handleClose();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              p: 0,
              alignItems: 'center',
              minHeight: '16px',
              fontSize: {
                xs: '14px',
                md: '16px',
              },
              fontWeight: 500,

              '&:hover': {
                color: '#85aa9f',
                backgroundColor: 'transparent',
                '& svg': {
                  stroke: '#85aa9f',
                },
              },
            }}
          >
            <Icon
              name="icon-trash"
              className="w-[16px] h-[16px] fill-transparent stroke-black-50"
            />
            Delete
          </MenuItem>
        </Box>
      </Popover>
    </div>
  );
}
