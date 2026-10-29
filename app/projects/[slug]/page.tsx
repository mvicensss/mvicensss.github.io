import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  try {
    return allProjects
      .filter((p) => p.published !== false)
      .map((p) => ({
        slug: p.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24">
      <Header project={project} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-8 sm:-mt-12 relative z-20">
        <article className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-10 md:p-14 font-sans text-zinc-800 prose prose-zinc max-w-none">
          <Mdx code={project.body.code} />
        </article>
      </main>
    </div>
  );
}
