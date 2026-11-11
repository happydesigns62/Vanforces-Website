import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Words } from "@/components/motion/Words";
import { web } from "@/data/media";
import { trustedLogos } from "@/data/trusted-logos";
import { HeroFlow } from "./HeroFlow";
import { HeroDashboard } from "./HeroDashboard";
import { VanSalesScene } from "./VanSalesScene";



/** The logo row repeats this many times per half, so the drifting strip is always wider than the screen. */
const REPEATS = 3;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? "motion-reduce:hidden" : ""}`}>
      {trustedLogos.map((logo) => (
        <li key={logo.name} className="group flex h-20 shrink-0 items-center px-6 sm:px-9">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            sizes="140px"
            className={`${logo.className} object-contain transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-105`}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Homepage hero. Centred text, then real Vanforces screens fading through one frame, then customer logos
 * drifting slowly sideways. Motion flow: text rises in on load, the stage grows as it scrolls into view,
 * the mascot follows, and the text eases away as the visitor scrolls on.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-clip bg-white pt-14 md:pt-24">
      <HeroFlow className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(100%,44rem)] w-full hero-flow-mask" />
      <div className="wrap relative">
        <ScrollScene mode="exit" className="scene-away mx-auto max-w-4xl text-center">
          <p className="seq inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-line bg-white/80 px-4 py-1.5 text-center text-[13px] font-semibold text-teal-deep shadow-[0_1px_2px_rgb(41_59_71/0.05)]" style={delay(0)}>
            <span aria-hidden="true" className="h-3 w-[5px] shrink-0 rotate-[30deg] rounded-full bg-teal" />
            Connected Distribution Operations Platform
          </p>
          <h1
            className="words-load mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.5rem,1.5rem+3vw,4rem)] font-medium leading-[1.06] tracking-[-0.048em] text-navy-deep"
            style={delay(80)}
          >
            <Words text="Connected Distribution. Made Smarter with AI." />
          </h1>
          <p className="seq mx-auto mt-6 max-w-[35rem] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]" style={delay(170)}>
            Connect field sales, inventory, orders, deliveries and collections in one intelligent distribution platform.
          </p>
          <div className="seq mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={delay(260)}>
            <Button href="/book-demo" arrow className="!min-h-[50px] !px-7 !text-[15px]">
              Book a Demo
            </Button>
            <Button href="#plans" variant="secondary" className="!min-h-[50px] !px-7 !text-[15px]">
              Explore Plans &amp; Pricing
            </Button>
          </div>
        </ScrollScene>

        <div className="seq mx-auto mt-10 max-w-[1200px] md:mt-14" style={delay(340)}>
          <VanSalesScene />
        </div>

        <div className="seq-shot relative mx-auto mt-10 max-w-[1200px] md:mt-16" style={delay(400)}>
          <ScrollScene mode="entry" className="scene-stage">
            <HeroDashboard shot={web.heroDashboard} sizes="(max-width: 1280px) 92vw, 1090px" />
          </ScrollScene>
        </div>

        <div className="seq mt-16 pb-20 md:mt-24 md:pb-28" style={delay(560)}>
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-navy/75">Trusted by distribution teams</p>
          <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:flex motion-reduce:justify-center">
            <div className="marquee-track flex">
              <LogoSet />
              {Array.from({ length: REPEATS * 2 - 1 }, (_, index) => (
                <LogoSet key={index} hidden />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
