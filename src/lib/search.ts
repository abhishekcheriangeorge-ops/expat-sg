import type { SearchDoc } from "@/data/types";

function tokens(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+$]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function haystack(doc: SearchDoc): string {
  return `${doc.title} ${doc.excerpt} ${doc.blob ?? ""} ${doc.tags.join(" ")}`.toLowerCase();
}

export function searchDocs(index: SearchDoc[], query: string, limit = 24): SearchDoc[] {
  const q = query.trim();
  if (!q) {
    return [...index].sort((a, b) => b.weight - a.weight).slice(0, limit);
  }
  const tks = tokens(q);
  if (tks.length === 0) return [];

  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of index) {
    const hay = haystack(doc);
    let score = 0;
    const title = doc.title.toLowerCase();
    if (title === q.toLowerCase()) score += 80;
    if (title.includes(q.toLowerCase())) score += 40;
    for (const t of tks) {
      if (title.startsWith(t)) score += 18;
      else if (title.includes(t)) score += 12;
      if (doc.tags.some((tag) => tag.toLowerCase().includes(t))) score += 8;
      if (hay.includes(t)) score += 4;
    }
    if (score === 0) continue;
    score += doc.weight;
    if (doc.sponsored) score += 6;
    scored.push({ doc, score });
  }

  scored.sort((a, b) => b.score - a.score);

  const organic = scored.map((s) => s.doc);
  const sponsored = organic.filter((d) => d.sponsored);
  const rest = organic.filter((d) => !d.sponsored);
  const merged: SearchDoc[] = [];
  if (sponsored[0]) merged.push(sponsored[0]);
  for (const d of rest) merged.push(d);
  for (const d of sponsored.slice(1)) {
    if (!merged.includes(d)) merged.push(d);
  }
  return merged.slice(0, limit);
}

export function kindLabel(kind: SearchDoc["kind"]): string {
  switch (kind) {
    case "guide":
      return "Guide";
    case "neighbourhood":
      return "Area";
    case "listing":
      return "Directory";
    case "school":
      return "School";
    case "tool":
      return "Tool";
    default:
      return "Page";
  }
}
