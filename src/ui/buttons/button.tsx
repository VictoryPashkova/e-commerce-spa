import React from 'react';
import Button from '@mui/material/Button';

type UIButtonProps = {
  btnText: string;
  onClick: () => void;
  startIcon: JSX.Element;
  variant: 'text' | 'outlined' | 'contained';
  sx?: object;
};

const UIButton: React.FC<UIButtonProps> = ({ btnText, onClick, startIcon, variant, sx }) => {

  return (
    <Button
      startIcon={startIcon}
      variant={variant}
      onClick={onClick}
      sx={sx}
      type='button'
    >
      {btnText}
    </Button>
  );
};

export default UIButton;
