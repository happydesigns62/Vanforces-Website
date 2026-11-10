import Image from "next/image";
import { PageScene, type PageSceneKind } from "@/components/illustration/Vignettes";
import { ScrollReveal } from "@/components/motion/Reveal";

type Scene = { src: string; alt: string; focus: string };

const warehouse: Scene = { src: "/photos/warehouse-loading.webp", alt: "Two workers loading cartons into a white Vanforces van at a warehouse loading bay.", focus: "object-[70%_35%]" };
const stop: Scene = { src: "/photos/delivery-stop.webp", alt: "A Vanforces van parked outside a row of shops while the driver carries a carton to a shop door.", focus: "object-center" };
const shop: Scene = { src: "/photos/shop-counter.webp", alt: "A salesman in a Vanforces shirt checking an order on his phone with a shopkeeper at a grocery counter.", focus: "object-[50%_30%]" };
const office: Scene = { src: "/photos/office.webp", alt: "People at their desks in an office, one reviewing charts on a monitor.", focus: "object-center" };

// Which scene belongs to which product, industry or solution page. Pages not listed simply show no photo.
const scenes: Record<string, Scene> = {
  "field-sales": shop,
  fmcg: shop,
  inventory: warehouse,
  "wholesale-distribution": warehouse,
  delivery: stop,
  "direct-store-delivery": stop,
  "control-room": office,
};

// The illustrated banner for every other page: the building that belongs to the work.
const drawings: Record<string, PageSceneKind> = {
  "van-sales": "van",
  routes: "van",
  offline: "van",
  "food-beverage": "van",
  "field-teams": "van",
  customers: "shop",
  orders: "shop",
  collections: "shop",
  "b2b-ordering": "shop",
  intelligence: "office",
  managers: "office",
  finance: "office",
  "it-erp": "office",
};

/** One wide scene photo for a page, chosen by the page's slug. These are AI-generated scenes, to be replaced with real photos. */
export function ScenePhoto({ slug }: { slug: string }) {
  const scene = scenes[slug];
  if (!scene) {
    const kind = drawings[slug];
    if (!kind) return null;
    return (
      <section className="section-tight">
        <div className="wrap max-w-[1040px]">
          <ScrollReveal>
            <PageScene kind={kind} className="mx-auto max-w-[760px]" />
          </ScrollReveal>
        </div>
      </section>
    );
  }
  return (
    <section className="section-tight">
      <div className="wrap max-w-[1040px]">
        <ScrollReveal className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-paper md:aspect-[21/8]">
          <Image src={scene.src} alt={scene.alt} fill sizes="(max-width: 1040px) 94vw, 1000px" className={`object-cover ${scene.focus}`} />
        </ScrollReveal>
      </div>
    </section>
  );
}
