import type { Metadata } from "next";
import { LegalDocument } from "@/components/global/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy (Draft)",
  description: "Draft privacy notice for the Vanforces website prototype, pending legal review.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      label="Draft for review"
      notice="This is a draft for review, not an official Vanforces privacy commitment. It must be replaced with a policy approved by legal counsel before the website goes live."
      sections={[
        {
          heading: "About this draft",
          paragraphs: ["This page shows where the Vanforces privacy policy will appear and how it will be presented. It describes how this frontend demonstration behaves. It does not describe how the Vanforces product or company handles data."],
        },
        {
          heading: "How this demonstration handles information",
          paragraphs: ["This website is a frontend prototype. It does not submit data to a Vanforces server."],
          bullets: [
            "Contact, demo and partner forms check your entries in your browser, and then do not send them anywhere.",
            "The Get Started demo keeps entries temporarily in your browser session, so you can move back and forward. The demo password is kept in memory only.",
            "No real verification codes are sent and no payments are processed.",
          ],
        },
        {
          heading: "Sections to be completed before publication",
          paragraphs: ["Vanforces and its legal advisers will need to supply accurate content for the following topics. They are intentionally left unspecified here."],
          bullets: [
            "Who is responsible for personal data, and how to contact them",
            "What information is collected, and why",
            "How long information is kept",
            "Who it may be shared with, including service providers",
            "Rights available to individuals, and how to use them",
            "Cookies and analytics, if used",
          ],
        },
        {
          heading: "External links",
          paragraphs: ["This site links to Entaura.ai, a separately branded platform. Please refer to that website for information about how it handles data."],
        },
      ]}
    />
  );
}
