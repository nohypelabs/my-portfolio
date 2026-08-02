interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border border-foreground/10 bg-foreground/[0.04] text-foreground/70 font-mono whitespace-nowrap transition-colors hover:border-accent/40 hover:text-accent">
      {tech}
    </span>
  );
}