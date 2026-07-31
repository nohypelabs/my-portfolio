'use client';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`relative inline-block bg-double text-foreground px-2 -mx-0.5 box-decoration-clone rounded-[3px] ${className}`}
    >
      {children}
    </span>
  );
}
