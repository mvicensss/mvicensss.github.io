"use client";
import {
	motion,
	useMotionTemplate,
	useSpring,
} from "framer-motion";

import { PropsWithChildren } from "react";

type ProjectCardProps = PropsWithChildren<{
	className?: string;
}>;

export const ProjectCard: React.FC<ProjectCardProps> = ({
	children,
	className = "",
}) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div
			onMouseMove={onMouseMove}
			className={`overflow-hidden relative duration-700 border rounded-xl group transition-all bg-slate-900/25 hover:bg-[#4663ac]/15 border-blue-200/20 hover:border-blue-200/45 backdrop-blur-[2px] ${className}`}
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-blue-100/10 transition duration-1000 group-hover:opacity-50"
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
					style={style}
				/>
				{/* Top border subtle pastel shimmer */}
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
			</div>

			<div className="relative z-20 flex flex-col h-full">{children}</div>
		</div>
	);
};
