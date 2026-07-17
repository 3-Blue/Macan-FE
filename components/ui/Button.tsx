import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const muiVariant = variant === "primary" ? "contained" : "outlined";

  return (
    <MuiButton variant={muiVariant} color="primary" {...props}>
      {children}
    </MuiButton>
  );
}
