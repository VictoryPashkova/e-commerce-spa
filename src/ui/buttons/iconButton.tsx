import React from 'react';
import IconButton from '@mui/material/IconButton';

type IconButtonUIProps = {
  onClick: () => void;
  sx?: object;
  Icon: JSX.Element;
  ariaLabel: string;
};

const IconButtonUI: React.FC<IconButtonUIProps> = ({ onClick, Icon, ariaLabel, sx }) => {
  return (
    <button onClick={(e) => e.preventDefault()}>
          <IconButton
            aria-label={ariaLabel}
            size="small"
            onClick={onClick}
            sx={sx}
            >
           {Icon}
      </IconButton>
    </button>
  );
};

export default IconButtonUI;
