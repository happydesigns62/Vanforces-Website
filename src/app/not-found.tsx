import type { Metadata } from "next";
import { Button } from "@/components/global/Button";
import { Mascot } from "@/components/global/Mascot";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for may have moved.",
};

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-center py-16 text-center md:py-24">
      <div className="seq w-full max-w-[340px]">
        <Mascot name="location" priority sizes="340px" className="w-full" />
      </div>
      <h1 className="t-page seq mt-8 max-w-3xl" style={{ "--d": "80ms" } as React.CSSProperties}>
        Looks Like This Route Isn&apos;t on the Plan.
      </h1>
      <p className="lede seq mt-5" style={{ "--d": "150ms" } as React.CSSProperties}>
        The page you&apos;re looking for may have moved.
      </p>
      <div className="seq mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "220ms" } as React.CSSProperties}>
        <Button href="/">Back to Home</Button>
        <Button href="/platform" variant="secondary">
          Explore the Platform
        </Button>
      </div>
    </section>
  );
}
