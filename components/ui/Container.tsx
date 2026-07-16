import MuiContainer, { ContainerProps as MuiContainerProps } from "@mui/material/Container";
import { ReactNode } from "react";

interface ContainerProps extends Omit<MuiContainerProps, "maxWidth"> {
  children: ReactNode;
}

export function Container({ children, ...props }: ContainerProps) {
  return (
    <MuiContainer maxWidth="lg" {...props}>
      {children}
    </MuiContainer>
  );
}
