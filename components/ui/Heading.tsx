import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Heading({ children, level = 2, className }: HeadingProps) {
  const variant = `h${level}` as "h1" | "h2" | "h3" | "h4";

  return (
    <Typography variant={variant} component={variant} className={className}>
      {children}
    </Typography>
  );
}
