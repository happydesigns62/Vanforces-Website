import type { Metadata } from "next";
import Link from "next/link";
import { DemoNotice } from "@/components/global/Common";
import { LoginPrototype } from "@/components/commercial/LoginPrototype";
import { MobileScreenshotFrame } from "@/components/product/Frames";
import { phone } from "@/data/media";

export const metadata: Metadata = {
  title: "Login",
  description: "Visual prototype of the Vanforces login page.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="hidden lg:block">
          <div className="seq-shot relative isolate mx-auto w-full max-w-[290px]">
            <span aria-hidden="true" className="capsule -left-40 top-24 -z-10 h-56 w-[560px] border-2 border-teal/30" />
            <MobileScreenshotFrame shot={phone.login} priority />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="t-section seq">Log in to Vanforces</h1>
          <div className="seq mt-5" style={{ "--d": "80ms" } as React.CSSProperties}>
            <DemoNotice>Visual prototype: no login destination has been connected yet.</DemoNotice>
          </div>
          <div className="seq mt-6" style={{ "--d": "140ms" } as React.CSSProperties}>
            <LoginPrototype />
          </div>
          <p className="seq mt-6 text-[14.5px] text-muted" style={{ "--d": "200ms" } as React.CSSProperties}>
            New to Vanforces?{" "}
            <Link href="/pricing" className="font-semibold text-teal-deep hover:text-navy">
              See our plans
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
