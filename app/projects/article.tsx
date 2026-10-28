import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, Github } from "lucide-react";

export const PROJECT_METADATA: Record<
	string,
	{ label: string; badgeClass: string }
> = {
	"prosper-clinicreflow": {
		label: "Voice AI · HealthTech",
		badgeClass: "bg-sky-400/10 text-sky-200 border-sky-300/25",
	},
	studentai: {
		label: "Machine Learning · EdTech",
		badgeClass: "bg-indigo-300/10 text-indigo-200 border-indigo-200/25",
	},
	shopping: {
		label: "IoT · Full-Stack Web",
		badgeClass: "bg-teal-300/10 text-teal-200 border-teal-200/25",
	},
	"accenture-mavericks": {
		label: "AI Document Intelligence",
		badgeClass: "bg-amber-200/10 text-amber-100 border-amber-200/25",
	},
};

type Props = {
	project: Project;
	views?: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	const meta = PROJECT_METADATA[project.slug];

	return (
		<Link href={`/projects/${project.slug}`} className="flex flex-col h-full w-full">
			<article className="flex flex-col justify-between h-full p-4 md:p-8">
				<div>
					<div className="flex flex-wrap items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							{meta && (
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal tracking-wide border backdrop-blur-sm ${meta.badgeClass}`}
								>
									{meta.label}
								</span>
							)}
						</div>
						<div className="text-xs duration-700 text-blue-200/70 group-hover:text-blue-100">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
										new Date(project.date),
									)}
								</time>
							) : (
								<span>SOON</span>
							)}
						</div>
					</div>

					<h2 className="z-20 mt-4 text-xl font-medium duration-700 lg:text-3xl text-zinc-100 group-hover:text-white font-display tracking-tight">
						{project.title}
					</h2>
					<p className="z-20 mt-4 text-sm duration-700 text-zinc-300/80 group-hover:text-zinc-200 font-sans leading-relaxed">
						{project.description}
					</p>
				</div>

				<div className="pt-4 mt-6 border-t border-blue-200/10 flex items-center justify-between text-xs">
					<span className="text-blue-200/70 group-hover:text-white duration-700 inline-flex items-center gap-1 font-medium transition-all group-hover:translate-x-1">
						Read more <span aria-hidden="true">&rarr;</span>
					</span>

					<div className="flex items-center gap-3">
						{project.repository && (
							<span className="inline-flex items-center gap-1 text-blue-200/50 group-hover:text-blue-200/80 duration-700 transition-colors font-sans">
								<Github className="w-3.5 h-3.5" />
								{project.repository.split("/")[1] || project.repository}
							</span>
						)}
						{views !== undefined && (
							<span className="text-blue-200/50 text-xs flex items-center gap-1">
								<Eye className="w-3.5 h-3.5" />{" "}
								{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
							</span>
						)}
					</div>
				</div>
			</article>
		</Link>
	);
};
