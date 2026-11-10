import type { MetadataRoute } from "next";
import { customerStories } from "@/data/customers";
import { industries } from "@/data/industries";
import { integrations } from "@/data/integrations";
import { modules } from "@/data/modules";
import { guides } from "@/data/resources";
import { solutions } from "@/data/solutions";

export const allRoutes = [
  "/",
  "/platform",
  "/platform/modules",
  "/platform/use-cases",
  ...modules.map((m) => `/platform/${m.slug}`),
  "/business-command-center",
  "/solutions",
  ...solutions.map((s) => `/solutions/${s.slug}`),
  "/industries",
  ...industries.map((i) => `/industries/${i.slug}`),
  "/customers",
  ...customerStories.map((s) => `/customers/stories/${s.slug}`),
  "/integrations",
  ...integrations.map((i) => `/integrations/${i.slug}`),
  "/pricing",
  "/roi",
  "/resources",
  "/resources/faq",
  ...guides.map((g) => `/resources/guides/${g.slug}`),
  "/company",
  "/company/deployment",
  "/partners",
  "/contact",
  "/book-demo",
  "/get-started",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({ url: `https://www.vanforces.com${route === "/" ? "" : route}` }));
}
