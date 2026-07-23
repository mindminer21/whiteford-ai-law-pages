import { portalAgendaItems } from "@/lib/portal/mock-data";

const lanes = [
  ["urgent", "Urgent"],
  ["important", "Important"],
  ["monitor", "Monitor"],
  ["defer", "Defer"],
] as const;

export function MonthlyAgendaBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {lanes.map(([lane, label]) => <section key={lane} className="border border-[#d8d0c3] bg-[#fffdf8] p-4"><h2 className="font-semibold text-[#121827]">{label}</h2><div className="mt-4 space-y-3">{portalAgendaItems.filter((item) => item.lane === lane).map((item) => <article key={item.id} className="border border-[#d8d0c3] bg-white p-3"><div className="text-sm font-semibold text-[#121827]">{item.title}</div><p className="mt-2 text-xs leading-5 text-[#354054]">{item.notes}</p><div className="mt-2 text-xs text-[#5d6678]">Owner: {item.owner}</div><div className="mt-2 flex flex-wrap gap-1">{item.issueTags.map((tag) => <span key={tag} className="bg-[#eef3fb] px-2 py-1 text-[11px] text-[#213f77]">{tag}</span>)}</div></article>)}</div></section>)}
    </div>
  );
}
