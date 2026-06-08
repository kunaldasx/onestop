"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
	{
		value: 50,
		suffix: "+",
		label: "Projects Completed",
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		value: 3,
		suffix: "+",
		label: "Years Experience",
		gradient: "from-purple-500 to-pink-500",
	},
	{
		value: 15,
		suffix: "+",
		label: "Team Members",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		value: 98,
		suffix: "%",
		label: "Client Satisfaction",
		gradient: "from-orange-500 to-yellow-500",
	},
];

function AnimatedCounter({
	value,
	suffix,
	isInView,
}: {
	value: number;
	suffix: string;
	isInView: boolean;
}) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	useEffect(() => {
		if (isInView) {
			const controls = animate(count, value, {
				duration: 2,
				ease: "easeOut",
			});
			return controls.stop;
		}
	}, [isInView, value, count]);

	return (
		<motion.span className="text-5xl md:text-6xl font-display font-bold text-primary-foreground">
			<motion.span>{rounded}</motion.span>
			{suffix}
		</motion.span>
	);
}

export function Stats() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			className="py-20 md:py-24 relative overflow-hidden bg-primary"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />

			<div
				className="absolute inset-0 opacity-30"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>

			<div className="absolute -top-40 -left-40 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
			<div className="absolute -bottom-40 -right-40 w-60 h-60 rounded-full bg-white/5 blur-3xl" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 30, scale: 0.9 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								duration: 0.5,
								delay: index * 0.1,
								type: "spring",
								stiffness: 100,
							}}
							viewport={{ once: true }}
							className="text-center relative group"
							data-testid={`stat-${stat.label
								.toLowerCase()
								.replace(/\s+/g, "-")}`}
						>
							<motion.div
								className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								whileHover={{ scale: 1.05 }}
							/>

							<motion.div
								className="relative z-10 py-4"
								whileHover={{ y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<motion.div
									initial={{ scale: 0 }}
									animate={
										isInView ? { scale: 1 } : { scale: 0 }
									}
									transition={{
										delay: 0.3 + index * 0.1,
										type: "spring",
										stiffness: 200,
									}}
								>
									<AnimatedCounter
										value={stat.value}
										suffix={stat.suffix}
										isInView={isInView}
									/>
								</motion.div>

								<motion.div
									className="text-primary-foreground/80 text-sm md:text-base mt-2"
									initial={{ opacity: 0 }}
									animate={
										isInView
											? { opacity: 1 }
											: { opacity: 0 }
									}
									transition={{ delay: 0.5 + index * 0.1 }}
								>
									{stat.label}
								</motion.div>

								<motion.div
									className={`w-12 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r ${stat.gradient} opacity-60`}
									initial={{ width: 0 }}
									animate={
										isInView ? { width: 48 } : { width: 0 }
									}
									transition={{
										delay: 0.7 + index * 0.1,
										duration: 0.5,
									}}
								/>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
