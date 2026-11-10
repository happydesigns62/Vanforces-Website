import type { Metadata } from "next";
import { LegalDocument } from "@/components/global/LegalDocument";

export const metadata: Metadata = {
  title: "Terms (Draft)",
  description: "Nonbinding draft terms page for the Vanforces website prototype, pending legal approval.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms"
      label="Nonbinding design draft"
      notice="This is a nonbinding design draft pending legal approval. It creates no rights or obligations and is not the official Vanforces terms of use or subscription terms."
      sections={[
        {
          heading: "About this draft",
          paragraphs: ["This page shows where the Vanforces terms will appear and how they will be presented. The final wording must come from Vanforces and its legal advisers."],
        },
        {
          heading: "Using this prototype",
          paragraphs: ["This website is a design prototype for review. Please keep the following in mind."],
          bullets: [
            "Prices, plans and feature allocations are demonstration content, not offers.",
            "Customer names, quotes, figures, stories and videos are fictional samples.",
            "Forms and the registration flow don't create accounts, bookings, orders or subscriptions.",
            "Product capabilities are described in general terms and should be confirmed with Vanforces.",
          ],
        },
        {
          heading: "Sections to be completed before publication",
          paragraphs: ["The following topics are intentionally left unspecified until they are approved."],
          bullets: [
            "Parties to the agreement and acceptance of terms",
            "Subscription, billing, renewal and cancellation terms",
            "Acceptable use and customer responsibilities",
            "Intellectual property",
            "Warranties and limits of liability",
            "Governing law and dispute resolution",
          ],
        },
      ]}
    />
  );
}
