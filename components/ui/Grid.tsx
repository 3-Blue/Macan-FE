import MuiGrid from "@mui/material/Grid";
import { Children, ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

// Maps our simplified `cols` prop to MUI v9's responsive `size` object
const COLS_TO_SIZE = {
  2: { xs: 12, sm: 6 },
  3: { xs: 12, sm: 6, lg: 4 },
  4: { xs: 12, sm: 6, lg: 3 },
} as const;

export function Grid({ children, cols = 3, className }: GridProps) {
  const size = COLS_TO_SIZE[cols];

  return (
    <MuiGrid container spacing={4} className={className}>
      {Children.map(children, (child, index) => (
        <MuiGrid key={index} size={size}>
          {child}
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}
