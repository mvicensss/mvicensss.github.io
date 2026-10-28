import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { ProjectCard } from "./project-card";
import { Article, PROJECT_METADATA } from "./article";
import { Github } from "lucide-react";

export const revalidate = 60;
export default async function ProjectsPage() {
  const publishedProjects = allProjects
    .filter((p) => p.published !== false)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

  // If we don't have enough projects, show a message
  if (publishedProjects.length === 0) {
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
              No projects available yet. Check back soon<span style={{ fontFamily: "Times New Roman, serif", fontSize: "0.9em" }}>!</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const featured = publishedProjects[0];
  const top2 = publishedProjects[1];
  const top3 = publishedProjects[2];
  const sorted = publishedProjects.slice(3);
  const featuredMeta = featured ? PROJECT_METADATA[featured.slug] : undefined;

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Projects
          </h2>
          <p className="mt-4 text-zinc-300/80">
            Main Storyline (Uni) & Side Quests (Personal).
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800/80" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {featured && (
            <ProjectCard className="h-full">
              <Link href={`/projects/${featured.slug}`} className="flex flex-col h-full w-full">
                <article className="relative flex flex-col justify-between h-full p-4 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-normal tracking-wide bg-blue-300/10 text-blue-100 border border-blue-200/25 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300/70" />
                          Featured Project
                        </span>
                        {featuredMeta && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal tracking-wide border backdrop-blur-sm ${featuredMeta.badgeClass}`}
                          >
                            {featuredMeta.label}
                          </span>
                        )}
                      </div>

                      <div className="text-xs duration-700 text-blue-200/70 group-hover:text-blue-100">
                        {featured.date ? (
                          <time dateTime={new Date(featured.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(featured.date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                    </div>

                    <h2
                      id="featured-post"
                      className="mt-4 text-3xl font-medium text-zinc-100 group-hover:text-white sm:text-4xl font-display tracking-tight duration-700"
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-700 text-zinc-300/80 group-hover:text-zinc-200 font-sans">
                      {featured.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-blue-200/10 flex items-center justify-between text-sm">
                    <span className="text-blue-200/70 group-hover:text-white duration-700 inline-flex items-center gap-1 font-medium transition-all group-hover:translate-x-1">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </span>
                    {featured.repository && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-blue-200/50 group-hover:text-blue-200/80 font-sans duration-700 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                        {featured.repository.split("/")[1] || featured.repository}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            </ProjectCard>
          )}

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
            {[top2, top3].filter(Boolean).map((project) => (
              <ProjectCard key={project.slug} className="flex-1">
                <Article project={project} />
              </ProjectCard>
            ))}
          </div>
        </div>

        {sorted.length > 0 && (
          <>
            <div className="hidden w-full h-px md:block bg-zinc-800/80" />
            <div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((project) => (
                <ProjectCard key={project.slug} className="h-full">
                  <Article project={project} />
                </ProjectCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
