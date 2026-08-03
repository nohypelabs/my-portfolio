interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium soft-border bg-[var(--bg-element-second)] text-foreground/70 font-mono whitespace-nowrap transition-colors hover:border-foreground/30 hover:text-foreground">
      {tech}
    </span>
  );
}