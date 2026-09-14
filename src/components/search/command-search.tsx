import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchDocs, kindLabel } from "@/lib/search";
import { SponsoredBadge } from "@/components/sponsored";
import { AppLink } from "@/components/app-link";
import { cn } from "@/lib/utils";

export function useSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if ((meta && e.key.toLowerCase() === "k") || (e.key === "/" && !isTyping(e))) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}

function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full min-w-0 items-center gap-2 rounded-md border border-border bg-surface px-3 text-left text-sm text-muted hover:border-fg/30"
    >
      <Search className="size-4 shrink-0" strokeWidth={1.75} />
      <span className="flex-1 truncate">Search visas, rent, schools…</span>
      <kbd className="hidden rounded-sm border border-border bg-sunken px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
        /
      </kbd>
    </button>
  );
}

export function CommandSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => searchDocs(q, 8), [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] sm:pt-[16vh]">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-fg/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-muted" strokeWidth={1.75} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClose();
                void navigate({ to: "/search", search: { q } });
              }
            }}
            placeholder="EP salary, Tiong Bahru, tax, Tanglin…"
            className="h-12 w-full bg-transparent text-base text-fg outline-none placeholder:text-subtle"
          />
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted">No matches.</li>
          ) : (
            results.map((r) => (
              <li key={r.id}>
                <AppLink
                  to={r.href}
                  onClick={onClose}
                  className={cn(
                    "flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-sunken",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {kindLabel(r.kind)}
                    </span>
                    {r.sponsored ? <SponsoredBadge /> : null}
                  </span>
                  <span className="font-medium text-fg">{r.title}</span>
                  <span className="line-clamp-1 text-sm text-muted">{r.excerpt}</span>
                </AppLink>
              </li>
            ))
          )}
        </ul>
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-subtle">
          <span>Enter for full results</span>
          <button
            type="button"
            className="font-medium text-primary"
            onClick={() => {
              onClose();
              void navigate({ to: "/search", search: { q } });
            }}
          >
            Open search
          </button>
        </div>
      </div>
    </div>
  );
}
