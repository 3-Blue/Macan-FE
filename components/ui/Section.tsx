import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <Box
      component="section"
      className={className}
      sx={{ py: { xs: 8, sm: 12 } }}
    >
      {children}
    </Box>
  );
}
