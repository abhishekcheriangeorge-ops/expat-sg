import { createContext, useContext } from "react";
import type { Corpus } from "@/lib/cms";

const CorpusContext = createContext<Corpus | null>(null);

export function CorpusProvider({
  value,
  children,
}: {
  value: Corpus;
  children: React.ReactNode;
}) {
  return <CorpusContext.Provider value={value}>{children}</CorpusContext.Provider>;
}

export function useCorpus(): Corpus {
  const value = useContext(CorpusContext);
  if (!value) throw new Error("Corpus is not loaded");
  return value;
}
