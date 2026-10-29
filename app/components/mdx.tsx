// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}
const components = {
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-4 scroll-m-20 text-3xl sm:text-4xl font-bold tracking-tight font-display text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-12 scroll-m-20 border-b border-zinc-200 pb-3 text-2xl sm:text-3xl font-bold tracking-tight font-display text-zinc-900 first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-xl sm:text-2xl font-bold tracking-tight font-display text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }) => (
		<h4
			className={clsx(
				"mt-6 scroll-m-20 text-lg font-bold tracking-tight font-display text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }) => (
		<h5
			className={clsx(
				"mt-6 scroll-m-20 text-base font-bold tracking-tight font-display text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }) => (
		<h6
			className={clsx(
				"mt-6 scroll-m-20 text-sm font-bold tracking-tight font-display text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-[#2d4e9c] hover:text-[#1e3467] underline underline-offset-4 transition-colors font-sans",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={clsx(
				"leading-7 text-zinc-700 font-sans text-base sm:text-[17px] [&:not(:first-child)]:mt-5",
				className,
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }) => (
		<ul
			className={clsx(
				"my-5 ml-6 list-disc space-y-2 text-zinc-700 font-sans text-base sm:text-[17px]",
				className,
			)}
			{...props}
		/>
	),
	ol: ({ className, ...props }) => (
		<ol
			className={clsx(
				"my-5 ml-6 list-decimal space-y-2 text-zinc-700 font-sans text-base sm:text-[17px]",
				className,
			)}
			{...props}
		/>
	),
	li: ({ className, ...props }) => (
		<li className={clsx("leading-7 text-zinc-700 font-sans", className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-4 border-[#4663ac]/50 bg-blue-50/50 py-3 pl-5 pr-4 rounded-r-lg italic text-zinc-800 font-sans [&>*]:text-zinc-700",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-xl border border-zinc-200 shadow-sm my-8 w-full", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-8 border-zinc-200 md:my-12" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-8 overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
			<table className={clsx("w-full text-sm font-sans text-zinc-700 text-left", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"border-b border-zinc-100 transition-colors last:border-0 hover:bg-zinc-50/80 even:bg-zinc-50/40",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }) => (
		<th
			className={clsx(
				"bg-zinc-100/80 px-4 py-3 text-left font-semibold text-zinc-900 border-b border-zinc-200 text-sm font-sans",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td
			className={clsx(
				"px-4 py-3 text-left align-top leading-relaxed text-sm text-zinc-700 font-sans",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-6 overflow-x-auto rounded-xl bg-zinc-900 p-4 border border-zinc-800 shadow-md",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded-md font-mono text-[0.88em] py-0.5 px-1.5 font-medium bg-zinc-100 text-zinc-800 border border-zinc-200/80",
				className,
			)}
			{...props}
		/>
	),
	Image,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
