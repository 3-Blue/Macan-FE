import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Heading({ children, level = 2, className = "" }: HeadingProps) {
  const baseStyles = "font-semibold tracking-tight";
  const sizeStyles = {
    1: "text-4xl sm:text-5xl",
    2: "text-3xl sm:text-4xl",
    3: "text-2xl sm:text-3xl",
    4: "text-xl sm:text-2xl",
  }[level];

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";

  return (
    <Tag className={`${baseStyles} ${sizeStyles} ${className}`}>
      {children}
    </Tag>
  );
}