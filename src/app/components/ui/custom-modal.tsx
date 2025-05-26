import React from 'react';
import { Modal, Box, Backdrop, Fade, IconButton } from '@mui/material';
import Icon from './icon';

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon: boolean;
};

export default function CustomModal({
  isOpen,
  onClose,
  children,
  showCloseIcon = true,
}: CustomModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '343px',
            '@media (min-width:768px)': {
              width: '628px',
            },
            bgcolor: '#85aa9f',
            borderRadius: 7,
            boxShadow: 24,
          }}
        >
          {showCloseIcon && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                '@media (min-width:768px)': {
                  top: '20px',
                  right: '20px',
                },
                p: 0,
              }}
            >
              <Icon
                name="icon-close"
                className="stroke-white w-6 h-6 md:w-8 md:h-8"
              />
            </IconButton>
          )}

          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
