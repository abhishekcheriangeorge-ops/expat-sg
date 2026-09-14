import { Link } from "@tanstack/react-router";
import type { Block } from "@/data/types";
import { cn } from "@/lib/utils";

export function Blocks({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-relaxed text-fg">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-fg">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl font-medium tracking-tight text-fg">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-base leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="bg-sunken text-muted">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-3 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2.5 tabular-nums">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside
          className={cn(
            "rounded-lg border px-4 py-3",
            block.tone === "warn" && "border-warn/30 bg-warn/8",
            block.tone === "ok" && "border-ok/30 bg-ok/8",
            block.tone === "info" && "border-border bg-sunken",
          )}
        >
          {block.title ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {block.title}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed">{block.text}</p>
        </aside>
      );
    case "stats":
      return (
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {block.items.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-4">
              <p className="font-display text-xl font-medium tabular-nums tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-fg">{s.label}</p>
              {s.hint ? <p className="mt-0.5 text-xs text-muted">{s.hint}</p> : null}
            </div>
          ))}
        </div>
      );
    case "cta":
      return (
        <Link
          to={block.href}
          className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover"
        >
          {block.label}
        </Link>
      );
  }
}
