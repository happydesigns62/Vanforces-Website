import type { Status } from "@/data/comparison";

// One fixed look per status. "Not Verified" is a dashed, neutral badge so it is never read as "Not Available".
const styles: Record<Status, string> = {
  Available: "border-accent-green-deep/25 bg-accent-green-soft text-accent-green-deep",
  "Limited / Configured": "border-accent-amber-deep/25 bg-accent-amber-soft text-accent-amber-deep",
  "In Development": "border-accent-blue-deep/25 bg-accent-blue-soft text-accent-blue-deep",
  "Not Available": "border-line bg-white text-navy",
  "Not Verified": "border-dashed border-muted/50 bg-mist text-muted",
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${styles[status]}`}>{status}</span>;
}
