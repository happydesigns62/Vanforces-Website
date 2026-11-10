import type { Metadata } from "next";
import { PageHero } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { GetStartedFlow } from "@/components/commercial/GetStartedFlow";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Explore the Vanforces registration experience. This is a frontend demo: no account is created and no payment is processed.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Let's Set Up Your Operation."
        description="Walk through what registration could look like. You can move back and forward, and your entries are kept for this browser session."
        crumbs={[{ label: "Get Started" }]}
        layout="split"
        visual={<Mascot name="setup" priority sizes="(max-width: 1024px) 60vw, 340px" className="mx-auto w-full max-w-[320px]" />}
      />
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <GetStartedFlow />
        </div>
      </section>
    </>
  );
}
