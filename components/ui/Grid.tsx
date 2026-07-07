import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

export function Grid({ children, cols = 3, className = "" }: GridProps) {
  const colStyles = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div className={`grid grid-cols-1 gap-8 ${colStyles} ${className}`}>
      {children}
    </div>
  );
}