import { cn } from "@/lib/utils";

export function SponsoredBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-sunken px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted",
        className,
      )}
    >
      Sponsored
    </span>
  );
}
