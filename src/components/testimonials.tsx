"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
	{
		id: 1,
		quote: "OneStop transformed our outdated systems into a modern, scalable platform. Their expertise and dedication exceeded our expectations. The ROI we've seen has been phenomenal.",
		author: "Raghav Sinha",
		role: "CTO",
		company: "RetailMax",
		initials: "RS",
		gradient: "from-blue-500 to-purple-500",
	},
	{
		id: 2,
		quote: "The team delivered our mobile app ahead of schedule with incredible attention to detail. Our user engagement increased by 200% within the first month of launch.",
		author: "Isha Pillai",
		role: "Product Director",
		company: "DataFlow Inc",
		initials: "IP",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		id: 3,
		quote: "Working with OneStop was a game-changer. Their SEO expertise helped us achieve top rankings and significantly boosted our organic traffic by 340%.",
		author: "Meera Joshi",
		role: "Marketing VP",
		company: "GrowthLabs",
		initials: "MJ",
		gradient: "from-pink-500 to-rose-500",
	},
	{
		id: 4,
		quote: "From concept to deployment, OneStop handled every aspect of our cloud migration flawlessly. Their team's technical knowledge and professionalism are unmatched.",
		author: "Siddharth Menon",
		role: "IT Director",
		company: "HealthFirst",
		initials: "SM",
		gradient: "from-orange-500 to-yellow-500",
	},
	{
		id: 5,
		quote: "The lead generation system OneStop built for us has completely transformed our sales pipeline. We're now closing 50% more deals with better qualified leads.",
		author: "Ritika Bhandari",
		role: "Sales Director",
		company: "TechVentures",
		initials: "RB",
		gradient: "from-cyan-500 to-blue-500",
	},
	{
		id: 6,
		quote: "Exceptional work on our e-commerce platform. The site performance improved dramatically and our conversion rate doubled. Highly recommend their services.",
		author: "Karan Deshpande",
		role: "CEO",
		company: "ShopEase",
		initials: "KD",
		gradient: "from-violet-500 to-purple-500",
	},

	{
		id: 7,
		quote: "Our Shopify store went from sluggish to lightning-fast. OneStop optimized everything—from UI flow to backend efficiency. Sales have jumped noticeably.",
		author: "Aarav Mathur",
		role: "E-Commerce Head",
		company: "UrbanKart",
		initials: "AM",
		gradient: "from-indigo-500 to-blue-500",
	},
	{
		id: 8,
		quote: "Their marketing strategy reshaped our online presence. We saw a major boost in lead quality and overall brand engagement within weeks.",
		author: "Neha Kulkarni",
		role: "Brand Manager",
		company: "CreativeNest",
		initials: "NK",
		gradient: "from-red-500 to-rose-500",
	},
	{
		id: 9,
		quote: "The automation workflows OneStop built saved us countless hours. Our ops team is finally able to focus on growth instead of repetitive manual tasks.",
		author: "Varun Prakash",
		role: "Operations Lead",
		company: "FlowCore",
		initials: "VP",
		gradient: "from-amber-500 to-orange-500",
	},
	{
		id: 10,
		quote: "Outstanding work on our analytics dashboard. The insights we now get in real-time have changed how we make decisions across the company.",
		author: "Sahana Iyer",
		role: "Data Strategy Lead",
		company: "InsightSphere",
		initials: "SI",
		gradient: "from-green-500 to-lime-500",
	},
];

function TestimonialCard({
	testimonial,
	isActive,
}: {
	testimonial: (typeof testimonials)[0];
	isActive: boolean;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card
				className={`p-8 h-full mx-2 transition-all duration-500 ${
					isHovered ? "border-primary/30 glow-sm" : "border-border/50"
				}`}
				data-testid={`card-testimonial-${testimonial.id}`}
			>
				<motion.div
					className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} p-[1px] mb-4`}
					animate={{ rotate: isHovered ? 5 : 0 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
						<Quote className="w-5 h-5 text-primary" />
					</div>
				</motion.div>

				<motion.blockquote
					className="text-foreground leading-relaxed mb-6 min-h-[120px]"
					animate={{ x: isHovered ? 5 : 0 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					"{testimonial.quote}"
				</motion.blockquote>

				<div className="flex items-center gap-4">
					<motion.div
						animate={{ scale: isHovered ? 1.05 : 1 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<Avatar
							className={`w-12 h-12 ring-2 ring-offset-2 ring-offset-background ring-transparent ${
								isHovered ? "ring-primary/30" : ""
							} transition-all duration-300`}
						>
							<AvatarFallback
								className={`bg-gradient-to-br ${testimonial.gradient} text-white font-medium`}
							>
								{testimonial.initials}
							</AvatarFallback>
						</Avatar>
					</motion.div>
					<div>
						<motion.div
							className="font-semibold text-foreground"
							animate={{ x: isHovered ? 3 : 0 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{testimonial.author}
						</motion.div>
						{/* <div className="text-sm text-muted-foreground">
							{testimonial.role}, {testimonial.company}
						</div> */}
					</div>
				</div>
			</Card>
		</motion.div>
	);
}

export function Testimonials() {
	const [isPlaying, setIsPlaying] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const autoplayPlugin = Autoplay({
		delay: 3000,
		stopOnInteraction: false,
		stopOnMouseEnter: true,
	});

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			slidesToScroll: 1,
		},
		[autoplayPlugin]
	);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const toggleAutoplay = useCallback(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		if (autoplay.isPlaying()) {
			autoplay.stop();
			setIsPlaying(false);
		} else {
			autoplay.play();
			setIsPlaying(true);
		}
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, onSelect]);

	return (
		<section
			id="about"
			className="py-20 md:py-32 bg-card/50 relative overflow-hidden"
		>
			<div
				className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-5 blur-3xl pointer-events-none"
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
						Testimonials
					</motion.span>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						What Our{" "}
						<span className="gradient-text">Clients Say</span>
					</motion.h2>
					<motion.p
						className="text-muted-foreground text-lg leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Don't just take our word for it. Here's what our
						partners have to say about working with us.
					</motion.p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="relative"
				>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex gap-6">
							{testimonials.map((testimonial, index) => (
								<TestimonialCard
									key={testimonial.id}
									testimonial={testimonial}
									isActive={index === selectedIndex}
								/>
							))}
						</div>
					</div>

					<motion.div
						className="flex items-center justify-center gap-4 mt-8"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						viewport={{ once: true }}
					>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Button
								variant="outline"
								size="icon"
								onClick={scrollPrev}
								className="rounded-full hover-glow transition-all duration-300"
								data-testid="button-testimonial-prev"
							>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">
									Previous testimonial
								</span>
							</Button>
						</motion.div>

						<div className="flex items-center gap-2">
							{testimonials.map((_, index) => (
								<motion.button
									key={index}
									onClick={() => emblaApi?.scrollTo(index)}
									className={`h-2 rounded-full transition-all duration-300 ${
										index === selectedIndex
											? "bg-primary w-6"
											: "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
									}`}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									data-testid={`button-testimonial-dot-${index}`}
								/>
							))}
						</div>

						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Button
								variant="outline"
								size="icon"
								onClick={scrollNext}
								className="rounded-full hover-glow transition-all duration-300"
								data-testid="button-testimonial-next"
							>
								<ChevronRight className="h-4 w-4" />
								<span className="sr-only">
									Next testimonial
								</span>
							</Button>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="ml-2"
						>
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleAutoplay}
								className="rounded-full"
								data-testid="button-testimonial-autoplay"
							>
								<motion.div
									animate={{ rotate: isPlaying ? 0 : 180 }}
									transition={{ duration: 0.3 }}
								>
									{isPlaying ? (
										<Pause className="h-4 w-4" />
									) : (
										<Play className="h-4 w-4" />
									)}
								</motion.div>
								<span className="sr-only">
									{isPlaying
										? "Pause autoplay"
										: "Play autoplay"}
								</span>
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
