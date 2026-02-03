import { Metadata } from "next";
import PageClient from "./page.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Preview",
    description: "Live preview of the component",
    openGraph: {
      title: "Component Preview",
      description: "Interactive component preview",
      type: "website",
    },
  };
}

export default async function PreviewPage(props: PageProps) {
  const { slug } = await props.params;
  const slugPath = slug.join("/");

  return <PageClient slugPath={slugPath} />;
}
