"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
	Globe,
	Smartphone,
	Cloud,
	Search,
	Target,
	Wrench,
	PackageSearch,
	Megaphone,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
	{
		icon: Globe,
		title: "Web Development",
		description:
			"Custom web applications built with modern frameworks like React, Next.js, and Vue. Responsive, fast, and scalable solutions.",
		gradient: "from-blue-500/5 to-cyan-500/5",
	},
	{
		icon: Smartphone,
		title: "Mobile Apps",
		description:
			"Native and cross-platform mobile applications for iOS and Android. Seamless user experiences on every device.",
		gradient: "from-purple-500/5 to-pink-500/5",
	},
	{
		icon: Globe,
		title: "Wix, WordPress & Shopify Management",
		description:
			"Design, build, and maintain high-performing websites on Wix, WordPress, Shopify, and other modern platforms.",
		gradient: "from-emerald-500/5 to-teal-500/5",
	},

	{
		icon: Cloud,
		title: "Cloud Solutions",
		description:
			"Scalable cloud infrastructure on AWS, Azure, and Google Cloud. Secure, reliable, and cost-effective deployments.",
		gradient: "from-green-500/5 to-emerald-500/5",
	},
	{
		icon: Search,
		title: "SEO & Marketing",
		description:
			"Data-driven SEO strategies and digital marketing campaigns that increase visibility and drive organic growth.",
		gradient: "from-orange-500/5 to-yellow-500/5",
	},
	{
		icon: Target,
		title: "Lead Generation",
		description:
			"Comprehensive lead generation systems that capture, nurture, and convert prospects into loyal customers.",
		gradient: "from-red-500/5 to-rose-500/5",
	},
	{
		icon: PackageSearch,
		title: "Marketplace Management",
		description:
			"End-to-end support for product listings, optimization, and ongoing maintenance across Amazon, Flipkart, Blink-it and other major marketplaces.",
		gradient: "from-blue-500/5 to-cyan-500/5",
	},
	{
		icon: Megaphone,
		title: "Marketing & Ad Campaigns",
		description:
			"Strategic promotion and ad management across digital channels to drive traffic, boost conversions, and grow your brand visibility.",
		gradient: "from-purple-500/5 to-fuchsia-500/5",
	},
	{
		icon: Wrench,
		title: "Ongoing Maintenance",
		description:
			"Proactive maintenance and support services to keep your software running smoothly and securely 24/7.",
		gradient: "from-indigo-500/5 to-violet-500/5",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

function ServiceCard({
	service,
	index,
}: {
	service: (typeof services)[0];
	index: number;
}) {
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateXValue = ((y - centerY) / centerY) * -8;
		const rotateYValue = ((x - centerX) / centerX) * 8;

		setRotateX(rotateXValue);
		setRotateY(rotateYValue);
	};

	const handleMouseLeave = () => {
		setRotateX(0);
		setRotateY(0);
		setIsHovered(false);
	};

	return (
		<motion.div variants={itemVariants} style={{ perspective: 1000 }}>
			<motion.div
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={handleMouseLeave}
				style={{
					rotateX,
					rotateY,
					transformStyle: "preserve-3d",
				}}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				<Card
					className={`group relative p-8 h-full cursor-pointer border-border/50 overflow-hidden transition-all duration-500 ${
						isHovered ? "border-primary/30 glow-md" : ""
					}`}
					data-testid={`card-service-${index}`}
				>
					<motion.div
						className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500`}
						animate={{ opacity: isHovered ? 1 : 0 }}
					/>

					<motion.div
						className="absolute inset-0 opacity-0"
						animate={{ opacity: isHovered ? 0.5 : 0 }}
						style={{
							background:
								"radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.15), transparent 50%)",
						}}
					/>

					<div className="relative z-10">
						<motion.div
							className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300"
							whileHover={{ scale: 1.1, rotate: 5 }}
							animate={{
								backgroundColor: isHovered
									? "hsl(var(--primary) / 0.2)"
									: "hsl(var(--primary) / 0.1)",
							}}
						>
							<motion.div
								animate={{
									rotate: isHovered ? [0, -10, 10, 0] : 0,
								}}
								transition={{ duration: 0.5 }}
							>
								<service.icon className="w-7 h-7 text-primary" />
							</motion.div>
						</motion.div>

						<motion.h3
							className="font-display text-xl font-semibold text-foreground mb-3"
							animate={{ x: isHovered ? 5 : 0 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{service.title}
						</motion.h3>

						<p className="text-muted-foreground leading-relaxed">
							{service.description}
						</p>

						<motion.div
							className="mt-4 flex items-center text-primary font-medium text-sm opacity-0"
							animate={{
								opacity: isHovered ? 1 : 0,
								x: isHovered ? 0 : -10,
							}}
							transition={{ duration: 0.3 }}
						>
							Learn more
							<motion.svg
								className="w-4 h-4 ml-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								animate={{ x: isHovered ? 5 : 0 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</motion.svg>
						</motion.div>
					</div>
				</Card>
			</motion.div>
		</motion.div>
	);
}

export function Services() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			id="services"
			className="py-20 md:py-32 bg-card/50 relative overflow-hidden"
		>
			<div
				className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
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
						className="text-primary font-medium text-sm tracking-wider uppercase inline-block"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						What We Do
					</motion.span>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						Comprehensive{" "}
						<span className="gradient-text">Digital Services</span>
					</motion.h2>
					<motion.p
						className="text-muted-foreground text-lg leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						From concept to deployment, we offer end-to-end
						solutions that help businesses thrive in the digital
						age.
					</motion.p>
				</motion.div>

				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{services.map((service, index) => (
						<ServiceCard
							key={service.title}
							service={service}
							index={index}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
}
