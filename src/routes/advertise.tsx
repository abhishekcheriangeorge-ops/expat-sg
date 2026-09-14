import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Eyebrow } from "@/components/page";
import { useCorpus } from "@/lib/corpus";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advertise")({
  component: Advertise,
});

function Advertise() {
  const { adPackages, adWhy, site } = useCorpus();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pack, setPack] = useState(adPackages[0].id);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Page>
      <Eyebrow>Advertise</Eyebrow>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight">
        Buy the position, not the banner.
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Residents grocery-shop, school, insure, eat and hire here every month. People on the plane convert in week one.
        Live stories, search slots and directory features — labelled.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {adPackages.map((p) => (
          <article
            key={p.id}
            className={cn(
              "rounded-xl border bg-surface p-6",
              p.featured ? "border-primary" : "border-border",
            )}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{p.period}</p>
            <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{p.name}</h2>
            <p className="mt-2 font-display text-3xl tabular-nums">{p.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.blurb}</p>
            <ul className="mt-4 flex flex-col gap-1.5 text-sm">
              {p.items.map((i) => (
                <li key={i}>— {i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {adWhy.map((w) => (
          <div key={w.title}>
            <h3 className="font-display text-xl font-medium">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-14 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium tracking-tight">Request a slot</h2>
        <p className="mt-2 text-sm text-muted">
          Goes to {site.advertiseEmail}. We reply with remaining inventory for the month.
        </p>
        {sent ? (
          <p className="mt-6 text-sm text-ok">Your mail client should open. Nothing is stored on this site.</p>
        ) : (
          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const pkg = adPackages.find((p) => p.id === pack);
              const body = encodeURIComponent(
                `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPackage: ${pkg?.name}\n\n${note}`,
              );
              window.location.href = `mailto:${site.advertiseEmail}?subject=${encodeURIComponent("expat.sg advertising")}&body=${body}`;
              setSent(true);
            }}
          >
            <Field label="Name" value={name} onChange={setName} required />
            <Field label="Work email" type="email" value={email} onChange={setEmail} required />
            <Field label="Company" value={company} onChange={setCompany} required />
            <label className="flex flex-col gap-1.5 text-sm">
              Package
              <select
                value={pack}
                onChange={(e) => setPack(e.target.value)}
                className="h-11 rounded-md border border-border bg-bg px-3"
              >
                {adPackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              What do you want to sell, and to whom?
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="rounded-md border border-border bg-bg px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="h-11 rounded-md bg-primary px-4 text-sm font-medium text-primary-fg sm:col-span-2"
            >
              Send request
            </button>
          </form>
        )}
      </section>
    </Page>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-md border border-border bg-bg px-3"
      />
    </label>
  );
}
