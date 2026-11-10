import { phone as phones, web as webs, type PhoneKey, type WebKey } from "@/data/media";
import type { HeroVisual } from "@/data/modules";
import { MobileScreenshotFrame, PrivacyCaption, WebScreenshotFrame } from "./Frames";
import { HubDiagram } from "./Diagrams";

/** Desktop frame with a phone overlapping its corner. On phones the two stack. */
export function DevicePair({ web, phone, priority }: { web: WebKey; phone: PhoneKey; priority?: boolean }) {
  return (
    <div className="relative pb-8 sm:pb-14 sm:pr-[12%]">
      <WebScreenshotFrame shot={webs[web]} priority={priority} sizes="(max-width: 1024px) 90vw, 760px" />
      <div className="absolute -bottom-0 right-0 w-[26%] min-w-[92px] max-w-[210px]">
        <MobileScreenshotFrame shot={phones[phone]} sizes="210px" />
      </div>
    </div>
  );
}

export function PhoneDuo({ phones: keys, priority }: { phones: PhoneKey[]; priority?: boolean }) {
  const [first, second] = keys;
  return (
    <div className="relative mx-auto flex max-w-[520px] items-start justify-center gap-4 sm:gap-6">
      <div className="w-[46%]">
        <MobileScreenshotFrame shot={phones[first]} priority={priority} />
      </div>
      {second ? (
        <div className="mt-12 w-[46%]">
          <MobileScreenshotFrame shot={phones[second]} />
        </div>
      ) : null}
    </div>
  );
}

export function HeroVisualView({ visual, priority = true }: { visual: HeroVisual; priority?: boolean }) {
  switch (visual.kind) {
    case "web":
      return (
        <>
          <WebScreenshotFrame shot={webs[visual.web]} priority={priority} />
          <PrivacyCaption className="mt-3" />
        </>
      );
    case "phones":
      return (
        <>
          <PhoneDuo phones={visual.phones} priority={priority} />
          <PrivacyCaption className="mt-4 text-center" />
        </>
      );
    case "pair":
      return (
        <>
          <DevicePair web={visual.web} phone={visual.phone} priority={priority} />
          <PrivacyCaption className="mt-3" />
        </>
      );
    case "hub":
      return <HubDiagram center={visual.center} nodes={visual.nodes} note={visual.note} />;
  }
}
