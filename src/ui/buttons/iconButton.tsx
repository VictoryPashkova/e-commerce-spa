import React from 'react';
import IconButton from '@mui/material/IconButton';

type IconButtonUIProps = {
  onClick: () => void;
  sx?: object;
  Icon: JSX.Element;
  ariaLabel: string;
};

const IconButtonUI: React.FC<IconButtonUIProps> = ({ onClick, Icon, ariaLabel, sx }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick?.();
  };

  return (
    <IconButton
      aria-label={ariaLabel}
      size="small"
      onClick={handleClick}
      sx={sx}
    >
      {Icon}
    </IconButton>
  );
};

export default IconButtonUI;