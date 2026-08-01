interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-surface text-foreground border-2 border-foreground shadow-[1px_1px_0px_#141414] font-mono whitespace-nowrap">
      {tech}
    </span>
  );
}
