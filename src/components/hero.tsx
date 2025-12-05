"use client";

import {
	motion,
	useScroll,
	useTransform,
	useReducedMotion,
} from "framer-motion";
import { ArrowRight, Sparkles, Code, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

const floatingIcons = [
	{ Icon: Code, delay: 0, x: "10%", y: "20%" },
	{ Icon: Zap, delay: 0.5, x: "85%", y: "30%" },
	{ Icon: Layers, delay: 1, x: "15%", y: "70%" },
];

export function Hero() {
	const containerRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const y = useTransform(
		scrollYProgress,
		[0, 1],
		["0%", prefersReducedMotion ? "0%" : "30%"]
	);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.5],
		[1, prefersReducedMotion ? 1 : 0]
	);

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
			});
		}
	};

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			<motion.div
				className="absolute inset-0 z-0"
				style={{ y: prefersReducedMotion ? 0 : y }}
			>
				<Image
					src="/assets/hero_tech_workspace_image.png"
					alt="Modern software development workspace"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
				<div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
			</motion.div>

			{!prefersReducedMotion &&
				floatingIcons.map(({ Icon, delay, x, y }, index) => (
					<motion.div
						key={index}
						className="absolute z-10 hidden md:block"
						style={{ left: x, top: y }}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: delay + 0.8,
							duration: 0.5,
							type: "spring",
						}}
					>
						<motion.div
							className="w-14 h-14 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center"
							animate={{
								y: [0, -10, 0],
							}}
							transition={{
								duration: 4 + index,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<Icon className="w-6 h-6 text-primary" />
						</motion.div>
					</motion.div>
				))}

			<div
				className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
				}}
			/>

			<div
				className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, hsl(280 65% 65%) 0%, transparent 70%)",
				}}
			/>

			<motion.div
				className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
				style={{ opacity }}
			>
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 hover-glow cursor-default">
						{prefersReducedMotion ? (
							<Sparkles className="w-4 h-4 text-primary" />
						) : (
							<motion.div
								animate={{ rotate: [0, 15, -15, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<Sparkles className="w-4 h-4 text-primary" />
							</motion.div>
						)}
						<span className="text-sm font-medium text-foreground">
							Trusted by 50+ companies worldwide
						</span>
					</div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: prefersReducedMotion ? 0 : 0.6,
							delay: 0.1,
						}}
						className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
					>
						We Build{" "}
						<span
							className={
								prefersReducedMotion
									? "gradient-text"
									: "gradient-text-animated"
							}
						>
							Digital Experiences
						</span>{" "}
						That Matter
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
					>
						Transform your vision into reality with our expert team.
						We deliver cutting-edge web applications, mobile apps,
						and cloud solutions that drive growth and innovation.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Button
								size="lg"
								onClick={() => scrollToSection("#contact")}
								className="px-8 py-4 text-lg font-medium gap-2 group relative overflow-hidden"
								data-testid="button-hero-cta"
							>
								<span className="relative z-10 flex items-center gap-2">
									Start Your Project
									<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</span>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
									initial={{ x: "-100%" }}
									whileHover={{ x: "0%" }}
									transition={{ duration: 0.3 }}
								/>
							</Button>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Button
								variant="outline"
								size="lg"
								onClick={() => scrollToSection("#work")}
								className="px-8 py-4 text-lg font-medium bg-background/50 backdrop-blur-sm hover-glow transition-all duration-300"
								data-testid="button-hero-secondary"
							>
								View Our Work
							</Button>
						</motion.div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
					>
						{[
							{
								value: "50+",
								label: "Projects Delivered",
								testId: "stat-projects",
							},
							{
								value: "98%",
								label: "Client Satisfaction",
								testId: "stat-satisfaction",
							},
							{
								value: "3+",
								label: "Years Experience",
								testId: "stat-experience",
							},
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								className="flex items-center gap-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 + index * 0.1 }}
								data-testid={stat.testId}
							>
								<motion.span
									className="text-2xl font-bold text-foreground"
									whileHover={{
										scale: 1.1,
										color: "hsl(var(--primary))",
									}}
									transition={{
										type: "spring",
										stiffness: 300,
									}}
								>
									{stat.value}
								</motion.span>
								<span>{stat.label}</span>
								{index < 2 && (
									<div className="w-px h-8 bg-border hidden sm:block ml-6" />
								)}
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.div>

			{prefersReducedMotion ? (
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
					<div
						className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 cursor-pointer"
						onClick={() => scrollToSection("#services")}
					>
						<div className="w-1.5 h-1.5 rounded-full bg-primary" />
					</div>
				</div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.8 }}
					className="absolute bottom-8 left-1/2 -translate-x-1/2"
				>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 hover-glow cursor-pointer"
						onClick={() => scrollToSection("#services")}
					>
						<motion.div
							className="w-1.5 h-1.5 rounded-full bg-primary"
							animate={{ opacity: [1, 0.5, 1] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
					</motion.div>
				</motion.div>
			)}
		</section>
	);
}
