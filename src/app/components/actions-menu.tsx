'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Icon from './ui/icon';

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
              //   px: 1.5,
              //   py: 1,
              boxShadow: '0 4px 47px 0 rgba(18,20,23,0.08)',
              minWidth: 140,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleClose();
          }}
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <Icon
            name="icon-edit"
            className="w-[16px] h-[16px] stroke-green-dark"
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
            gap: 1.5,
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <Icon
            name="icon-trash"
            className="w-[16px] h-[16px] stroke-green-dark"
          />
          Delete
        </MenuItem>
      </Popover>
    </div>
  );
}

// import { useState, useRef, useEffect } from 'react';
// import Icon from './ui/icon';

// type ActionsMenuProps = {
//   onEdit: () => void;
//   onDelete: () => void;
// };

// export default function ActionsMenu({ onEdit, onDelete }: ActionsMenuProps) {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button onClick={() => setIsOpen(prev => !prev)} className="text-xl px-2">
//         ⋯
//       </button>
//       {isOpen && (
//         <div
//           className="absolute right-0 mt-2 w-[120px] z-10
//         flex flex-col gap-2 items-start py-3 px-6
//         bg-white-true rounded-[15px] shadow-[0_4px_47px_0_rgba(18,20,23,0.08)]"
//         >
//           <button
//             type="button"
//             onClick={onEdit}
//             className="text-sm md:text-base font-medium p-0 flex gap-2 items-center"
//           >
//             <Icon
//               name="icon-edit"
//               className="w-[16px] h-[16px] stroke-green-dark"
//             />
//             ✏️ Edit
//           </button>
//           <button
//             type="button"
//             onClick={onDelete}
//             className="text-sm md:text-base font-medium p-0 flex gap-2 items-center"
//           >
//             <Icon
//               name="icon-trash"
//               className="w-[16px] h-[16px] stroke-green-dark"
//             />
//             🗑️ Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
