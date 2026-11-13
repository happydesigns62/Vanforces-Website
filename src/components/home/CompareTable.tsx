import Image from "next/image";
import { Fragment } from "react";
import { platforms, type Row } from "@/data/comparison";
import { StatusBadge } from "./StatusBadge";

/**
 * Five columns: feature plus four platforms. The Vanforces column is softly tinted. On narrow screens the table scrolls sideways
 * and the feature column stays in place, so no one has to switch tabs to compare.
 */
export function CompareTable({ rows, showNotes = false, groupTitles }: { rows: Row[]; showNotes?: boolean; groupTitles?: Record<string, string> }) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-line bg-white" tabIndex={0} role="region" aria-label="Platform comparison table. Scroll sideways on small screens.">
      <table className="w-full min-w-[820px] border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-20 w-[22%] border-b border-line bg-white px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              Feature
            </th>
            {platforms.map((p) => (
              <th key={p.id} scope="col" className={`border-b border-line px-4 py-4 align-middle ${p.id === "vanforces" ? "bg-cyan-soft" : "bg-white"}`}>
                <span className="flex h-7 items-center gap-2 text-[14px] font-semibold text-navy-deep">
                  <Image src={p.logo} alt="" width={p.width} height={p.height} className="h-[22px] w-auto max-w-[110px] object-contain" />
                  <span className={p.id === "vanforces" ? "" : "sr-only"}>{p.name}</span>
                </span>
                {p.id !== "vanforces" ? <span className="mt-1 block text-[12px] font-medium text-muted">{p.name}</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, index) => {
            const header = groupTitles && r.group !== rows[index - 1]?.group ? groupTitles[r.group] : null;
            return (
              <Fragment key={r.area}>
                {header ? (
                  <tr>
                    <th colSpan={5} scope="colgroup" className="sticky left-0 border-b border-line bg-mist px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-deep">
                      {header}
                    </th>
                  </tr>
                ) : null}
                <tr>
                  <th scope="row" className="sticky left-0 z-10 border-b border-line bg-white px-4 py-3.5 text-[14.5px] font-semibold text-navy-deep">
                    {r.area}
                  </th>
                  {platforms.map((p) => (
                    <td key={p.id} className={`border-b border-line px-4 py-3.5 align-top ${p.id === "vanforces" ? "bg-cyan-soft/60" : ""}`}>
                      <StatusBadge status={r.cells[p.id].status} />
                      {showNotes && r.cells[p.id].note ? <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{r.cells[p.id].note}</p> : null}
                    </td>
                  ))}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

