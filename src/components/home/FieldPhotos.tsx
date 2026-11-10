import Image from "next/image";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";

const tile = "relative overflow-hidden rounded-[24px] bg-mist";

/**
 * The working day in three pictures, one large and two small: warehouse, road, office. The heading is the site's existing
 * line. These are AI-generated scene images, so they are never captioned as real staff.
 */
export function FieldPhotos() {
  return (
    <section className="section-tight">
      <div className="wrap max-w-[1040px]">
        <SectionHeading variant="fine" title="From the Warehouse to the Road" titleMuted="and Back to the Office." />

        <div className="mt-8 grid gap-4 lg:h-[280px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ScrollReveal className={`${tile} aspect-[4/3] lg:aspect-auto`}>
            <div className="absolute -inset-y-[4%] inset-x-0">
              <ScrollScene mode="pass" className="scene-drift relative h-full">
                <Image
                  src="/photos/warehouse-loading.webp"
                  alt="Two workers loading cartons into a white Vanforces van at a warehouse loading bay."
                  fill
                  sizes="(max-width: 1024px) 94vw, 700px"
                  className="object-cover object-[75%_35%]"
                />
              </ScrollScene>
            </div>
          </ScrollReveal>

          <div className="grid min-h-0 gap-4 lg:grid-rows-2">
            <ScrollReveal delay={100} className={`${tile} aspect-[16/9] lg:aspect-auto`}>
              <Image
                src="/photos/delivery-stop.webp"
                alt="A Vanforces van parked outside a row of shops while the driver carries a carton to a shop door."
                fill
                sizes="(max-width: 1024px) 94vw, 500px"
                className="object-cover"
              />
            </ScrollReveal>
            <ScrollReveal delay={180} className={`${tile} aspect-[16/9] lg:aspect-auto`}>
              <Image
                src="/photos/office.webp"
                alt="People at their desks in an office, one reviewing charts on a monitor."
                fill
                sizes="(max-width: 1024px) 94vw, 500px"
                className="object-cover"
              />
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
