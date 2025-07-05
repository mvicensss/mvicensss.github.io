"use client";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { text } from "stream/consumers";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};


};
export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-[#4663ac] via-zinc-500 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-[#4663ac]/0 border-transparent"
						: "bg-[#4663ac]/10 border-white/20 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
                            target="_blank"
                            href="https://www.linkedin.com/in/mvicens/"
                            className={`duration-200 hover:font-medium text-white hover:text-blue-200 ${
                                isIntersecting
                                    ? "text-white hover:text-blue-200"
                                    : "text-white hover:text-blue-200"
                            } `}
                        >
                            <Linkedin
                                className={`w-6 h-6 duration-200 hover:font-medium ${
                                    isIntersecting
                                        ? "text-white hover:text-blue-200"
                                        : "text-white hover:text-blue-200"
                                } `}
                            />
                        </Link>
						<Link target="_blank" href="https://github.com/mvicensss">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? "text-white hover:text-blue-200"
										: "text-white hover:text-blue-200"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? "text-white hover:text-blue-200"
								: "text-white hover:text-blue-200"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-seasons">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-white font-seasons">
							{project.description}
						</p>
					</div>

					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10 font-seasons">
							{links.map((link) => (
								<Link target="_blank" key={link.label} href={link.href} className="hover:text-blue-200 duration-200">
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
