import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

type Props = {
    children: any;
    variant?: "text"| "outlined" | "contained";
    onClick: React.MouseEventHandler;
}

export const ButtonMUI = (props: Props) => {

  const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[600]),
    backgroundColor: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[800],
    },
    borderRadius: "15px",
    fontWeight: 'bolder',
    fontSize: "1em",
    paddingBlock: "10px",
    marginTop: "30px"

  }));

  return (
    <CustomButton variant={props.variant} onClick={props.onClick}>
        {props.children}    
    </CustomButton>
        
    
  )
}
