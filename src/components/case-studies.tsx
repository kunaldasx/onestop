"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const projects = [
	{
		id: 1,
		title: "The calendar you need to meet",
		client: "Unified Labs",
		description:
			"Ready evolves your calendar into a living, breathing multiplayer workspace for teams to instantly make your meetings better.",
		image: "/assets/project-1.png",
		metrics: [
			{ label: "Meeting Time Reduced", value: "28%" },
			{ label: "Decision Speed Improved", value: "44%" },
		],
		tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
		featured: true,
		gradient: "from-blue-500/10 via-purple-500/5 to-pink-500/10",
		url: "https://ready.so/",
	},
	{
		id: 2,
		title: "AI Platform for Growth & Loyalty",
		client: "GrowthLoop",
		description:
			"One AI-powered customer platform for all your marketing and sales needs. From email, SMS, WhatsApp, and beyond, drive business growth and lasting loyalty.",
		image: "/assets/project-2.png",
		metrics: [
			{ label: "Automation Coverage", value: "73%" },
			{ label: "Retention Lift", value: "19%" },
		],
		tags: ["React", "Node.js", "AWS", "D3.js"],
		featured: false,
		gradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
		url: "https://www.brevo.com/",
	},
	{
		id: 3,
		title: "High-Quality Data for High-Converting Pipelines",
		client: "PipelineIQ",
		description:
			"Capture, enrich, and sync contacts automatically into your CRM stack—boost precision, eliminate data gaps, and fuel a pipeline built to convert.",
		image: "/assets/project-3.png",
		metrics: [
			{ label: "Lead Enrichment Rate", value: "92%" },
			{ label: "Duplicate Reduction", value: "68%" },
		],
		tags: ["React Native", "Firebase", "HealthKit"],
		featured: false,
		gradient: "from-orange-500/10 via-red-500/5 to-rose-500/10",
		url: "https://www.surfe.com/",
	},
];

function ProjectCard({
	project,
	isFeatured,
}: {
	project: (typeof projects)[0];
	isFeatured: boolean;
}) {
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	return (
		<motion.div
			initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: prefersReducedMotion ? 0 : 0.6,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			viewport={{ once: true }}
			className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link
				href={project.url}
				target="_blank"
				className="block h-full"
				aria-label={project.title}
			>
				<Card
					className={`group h-full overflow-hidden cursor-pointer border-border/50 transition-all duration-500 ${
						isHovered ? "border-primary/30 glow-md" : ""
					}`}
					data-testid={
						isFeatured
							? "card-project-featured"
							: `card-project-${project.id}`
					}
				>
					<div
						className={`relative ${
							isFeatured ? "h-64 lg:h-80" : "h-48"
						} overflow-hidden`}
					>
						<div className="absolute inset-0">
							<Image
								src={project.image}
								alt={project.title}
								fill
								className={`object-cover transition-transform duration-600 ${
									!prefersReducedMotion && isHovered
										? "scale-110"
										: "scale-100"
								}`}
							/>
						</div>

						<div
							className={`absolute inset-0 bg-gradient-to-br ${
								project.gradient
							} transition-opacity duration-400 ${
								isHovered ? "opacity-60" : "opacity-0"
							}`}
						/>

						<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

						<div
							className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
								isHovered
									? "opacity-100 scale-100"
									: "opacity-0 scale-50"
							}`}
						>
							<ArrowUpRight className="w-5 h-5 text-primary" />
						</div>
					</div>

					<div className={isFeatured ? "p-8" : "p-6"}>
						<div className="flex items-center gap-2 mb-4">
							{isFeatured && (
								<Badge variant="secondary" className="text-xs">
									Featured
								</Badge>
							)}
							<span className="text-sm text-muted-foreground">
								{project.client}
							</span>
						</div>

						<motion.h3
							className={`font-display ${
								isFeatured ? "text-2xl" : "text-lg"
							} font-bold text-foreground mb-3 flex items-center gap-2`}
							animate={{ x: isHovered ? 5 : 0 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{project.title}
							<motion.span
								animate={{
									opacity: isHovered ? 1 : 0,
									x: isHovered ? 0 : -10,
								}}
								transition={{ duration: 0.2 }}
							>
								<ArrowUpRight className="w-5 h-5 text-primary" />
							</motion.span>
						</motion.h3>

						<p
							className={`text-muted-foreground ${
								isFeatured
									? "mb-6 leading-relaxed"
									: "text-sm line-clamp-2 mb-4"
							}`}
						>
							{project.description}
						</p>

						{isFeatured && (
							<motion.div
								className="flex flex-wrap gap-6 mb-6"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								viewport={{ once: true }}
							>
								{project.metrics.map((metric, index) => (
									<motion.div
										key={metric.label}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.4 + index * 0.1,
										}}
										viewport={{ once: true }}
										whileHover={{ scale: 1.05 }}
									>
										<div className="text-2xl font-bold gradient-text">
											{metric.value}
										</div>
										<div className="text-sm text-muted-foreground">
											{metric.label}
										</div>
									</motion.div>
								))}
							</motion.div>
						)}

						<div className="flex flex-wrap gap-2">
							{(isFeatured
								? project.tags
								: project.tags.slice(0, 3)
							).map((tag, index) => (
								<motion.div
									key={tag}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.1 * index }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -2 }}
								>
									<Badge
										variant="outline"
										className="text-xs hover:border-primary/50 transition-colors"
									>
										{tag}
									</Badge>
								</motion.div>
							))}
						</div>
					</div>
				</Card>
			</Link>
		</motion.div>
	);
}

export default ProjectCard;

export function CaseStudies() {
	const featured = projects.find((p) => p.featured);
	const others = projects.filter((p) => !p.featured);

	return (
		<section id="work" className="py-20 md:py-32 relative overflow-hidden">
			<div
				className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full opacity-5 blur-3xl pointer-events-none -translate-y-1/2"
				style={{
					background:
						"radial-gradient(circle, hsl(280 65% 65%) 0%, transparent 70%)",
				}}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<motion.span
						className="text-primary font-medium text-sm tracking-wider uppercase"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						Our Work
					</motion.span>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						Featured{" "}
						<span className="gradient-text">Case Studies</span>
					</motion.h2>
					<motion.p
						className="text-muted-foreground text-lg leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Real results for real businesses. Explore how we've
						helped our clients achieve their digital transformation
						goals.
					</motion.p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{featured && (
						<ProjectCard project={featured} isFeatured={true} />
					)}
					{others.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							isFeatured={false}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
