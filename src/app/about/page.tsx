"use client";

import {
	motion,
	useInView,
	useMotionValue,
	useTransform,
	animate,
} from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
	Users,
	Target,
	Lightbulb,
	ArrowRight,
	Rocket,
	Heart,
	Shield,
	Sparkles,
} from "lucide-react";

const values = [
	{
		icon: Lightbulb,
		title: "Innovation First",
		description:
			"We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
		gradient: "from-amber-500 to-orange-500",
	},
	{
		icon: Users,
		title: "Client Partnership",
		description:
			"We work as an extension of your team, ensuring your success is our primary goal.",
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		icon: Shield,
		title: "Quality Assurance",
		description:
			"Every line of code is crafted with precision and tested rigorously for reliability.",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		icon: Heart,
		title: "Passion Driven",
		description:
			"We love what we do, and that passion translates into exceptional results for our clients.",
		gradient: "from-pink-500 to-rose-500",
	},
];

const stats = [
	{
		value: 50,
		suffix: "+",
		label: "Happy Clients",
		gradient: "from-blue-500 to-purple-500",
	},
	{
		value: 200,
		suffix: "+",
		label: "Projects Completed",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		value: 15,
		suffix: "+",
		label: "Team Members",
		gradient: "from-orange-500 to-yellow-500",
	},
	{
		value: 5,
		suffix: "+",
		label: "Years Experience",
		gradient: "from-pink-500 to-rose-500",
	},
];

const team = [
	{
		name: "Alex Chen",
		role: "CEO & Founder",
		initials: "AC",
		gradient: "from-blue-500 to-purple-500",
	},
	{
		name: "Sarah Miller",
		role: "CTO",
		initials: "SM",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		name: "James Wilson",
		role: "Lead Designer",
		initials: "JW",
		gradient: "from-orange-500 to-yellow-500",
	},
	{
		name: "Emily Rodriguez",
		role: "Project Manager",
		initials: "ER",
		gradient: "from-pink-500 to-rose-500",
	},
];

function AnimatedCounter({
	value,
	suffix = "",
}: {
	value: number;
	suffix?: string;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		if (isInView) {
			const controls = animate(count, value, {
				duration: 2,
				ease: "easeOut",
			});
			const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
			return () => {
				controls.stop();
				unsubscribe();
			};
		}
	}, [isInView, value, count, rounded]);

	return (
		<span
			ref={ref}
			className="font-display text-3xl md:text-4xl font-bold text-primary"
		>
			{displayValue}
			{suffix}
		</span>
	);
}

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			<main className="pt-32 pb-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
						>
							<Sparkles className="w-4 h-4 text-primary" />
							<span className="text-primary font-medium text-sm">
								About Us
							</span>
						</motion.div>
						<h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
							Building the Future of{" "}
							<span className="gradient-text">
								Digital Innovation
							</span>
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							We're a team of passionate developers, designers,
							and strategists dedicated to creating exceptional
							digital experiences that drive business growth.
						</p>
					</motion.div>

					<motion.section
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-24"
					>
						<Card className="p-8 md:p-12 border-border/50 overflow-hidden relative bg-gradient-to-br from-card via-card to-primary/5">
							<div
								className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
								}}
							/>
							<div
								className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
								style={{
									background:
										"radial-gradient(circle, hsl(280 65% 65%) 0%, transparent 70%)",
								}}
							/>
							<div className="flex-col justify-center items-center gap-12 relative z-10">
								<div className="grid grid-cols-2">
									<div>
										<motion.div
											className="flex items-center gap-3 mb-6"
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5 }}
											viewport={{ once: true }}
										>
											<motion.div
												className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-500 p-[1px]"
												whileHover={{
													scale: 1.05,
													rotate: 5,
												}}
												transition={{
													type: "spring",
													stiffness: 300,
												}}
											>
												<div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
													<Target className="w-6 h-6 text-primary" />
												</div>
											</motion.div>
											<h2 className="font-display text-2xl font-bold text-foreground">
												Our Mission
											</h2>
										</motion.div>
										<motion.p
											className="text-muted-foreground leading-relaxed mb-6"
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											transition={{
												duration: 0.5,
												delay: 0.1,
											}}
											viewport={{ once: true }}
										>
											At NexaTech, we believe technology
											should empower businesses, not
											complicate them. Our mission is to
											bridge the gap between complex
											technical solutions and real-world
											business needs.
										</motion.p>
										<motion.p
											className="text-muted-foreground leading-relaxed"
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											transition={{
												duration: 0.5,
												delay: 0.2,
											}}
											viewport={{ once: true }}
										>
											Founded with a vision to make
											premium software development
											accessible to businesses of all
											sizes, we've grown into a
											full-service digital agency that
											partners with companies worldwide to
											bring their ideas to life.
										</motion.p>
									</div>
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5 }}
										viewport={{ once: true }}
										className="mt-8 rounded-lg overflow-hidden border border-border/50 group"
									>
										<div className="relative overflow-hidden">
											<Image
												src="/about-team.jpg"
												alt="NexaTech team collaborating"
												width={500}
												height={300}
												className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
												priority
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>
									</motion.div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									{stats.map((stat, index) => (
										<motion.div
											key={stat.label}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.4,
												delay: 0.2 + index * 0.1,
											}}
											whileHover={{ y: -5, scale: 1.02 }}
											className="group"
										>
											<Card className="text-center p-6 rounded-xl bg-card border border-border/50 relative overflow-hidden h-full hover:border-primary/30 transition-colors">
												<div
													className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}
												/>
												<div className="relative z-10">
													<AnimatedCounter
														value={stat.value}
														suffix={stat.suffix}
													/>
													<div className="text-sm text-muted-foreground mt-2">
														{stat.label}
													</div>
													<motion.div
														className={`w-8 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r ${stat.gradient}`}
														initial={{ width: 0 }}
														whileInView={{
															width: 32,
														}}
														transition={{
															delay:
																0.5 +
																index * 0.1,
															duration: 0.5,
														}}
														viewport={{
															once: true,
														}}
													/>
												</div>
											</Card>
										</motion.div>
									))}
								</div>
							</div>
						</Card>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="mb-24"
					>
						<div className="text-center mb-12">
							<h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
								Our Core{" "}
								<span className="gradient-text">Values</span>
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								These principles guide everything we do and
								shape how we work with our clients.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{values.map((value, index) => (
								<motion.div
									key={value.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
								>
									<Card className="p-6 h-full border-border/50 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
										<div
											className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-500`}
										/>
										<div className="relative z-10">
											<motion.div
												className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.gradient} p-[1px] mb-4`}
												whileHover={{
													scale: 1.1,
													rotate: 5,
												}}
												transition={{
													type: "spring",
													stiffness: 300,
												}}
											>
												<div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
													<value.icon className="w-6 h-6 text-foreground" />
												</div>
											</motion.div>
											<h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
												{value.title}
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												{value.description}
											</p>
										</div>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="mb-24"
					>
						<div className="text-center mb-12">
							<h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
								Meet Our{" "}
								<span className="gradient-text">Team</span>
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Talented individuals working together to create
								amazing digital experiences.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{team.map((member, index) => (
								<motion.div
									key={member.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
								>
									<Card className="p-6 text-center border-border/50 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
										<div
											className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
										/>
										<div className="relative z-10">
											<motion.div
												className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} p-[2px] mx-auto mb-4`}
												whileHover={{ scale: 1.1 }}
												transition={{
													type: "spring",
													stiffness: 300,
												}}
											>
												<div className="w-full h-full rounded-full bg-card flex items-center justify-center">
													<span className="text-xl font-bold gradient-text">
														{member.initials}
													</span>
												</div>
											</motion.div>
											<h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
												{member.name}
											</h3>
											<p className="text-primary text-sm font-medium">
												{member.role}
											</p>
										</div>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Card className="p-8 md:p-12 text-center border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 relative overflow-hidden">
							<div
								className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-3xl pointer-events-none"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
								}}
							/>
							<div className="relative z-10">
								<motion.div
									className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 p-[2px] mx-auto mb-6"
									whileHover={{ scale: 1.1, rotate: 10 }}
									transition={{
										type: "spring",
										stiffness: 300,
									}}
								>
									<div className="w-full h-full rounded-full bg-card flex items-center justify-center">
										<Rocket className="w-8 h-8 text-primary" />
									</div>
								</motion.div>
								<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
									Ready to Start Your{" "}
									<span className="gradient-text">
										Project?
									</span>
								</h2>
								<p className="text-muted-foreground max-w-xl mx-auto mb-8">
									Let's discuss how we can help bring your
									vision to life. Our team is ready to tackle
									your next big challenge.
								</p>
								<Link href="/#contact">
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											size="lg"
											className="font-medium group"
										>
											Get in Touch
											<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</Button>
									</motion.div>
								</Link>
							</div>
						</Card>
					</motion.section>
				</div>
			</main>
			<Footer />
		</div>
	);
}
