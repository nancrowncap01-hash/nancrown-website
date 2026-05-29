import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/contact",
    title: "Contact Us — Request a Quote",
    description:
      "Get a free quote for custom hats. Tell us your style, quantity & logo — NanCrown replies within 24 hours. Low MOQ, worldwide shipping.",
  });
}

export default function ContactPage() {
  return <ContactForm />;
}
