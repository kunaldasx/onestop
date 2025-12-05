"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FooterLink = {
	label: string;
	href: string;
	isPage?: boolean;
};

const footerLinks = {
	services: [
		{ label: "Web Development", href: "#services" },
		{ label: "Mobile Apps", href: "#services" },
		{ label: "Cloud Solutions", href: "#services" },
		{ label: "SEO & Marketing", href: "#services" },
		{ label: "Lead Generation", href: "#services" },
		{ label: "Marketplace Management", href: "#services" },
	] as FooterLink[],
	company: [
		{ label: "About Us", href: "/about" },
		{ label: "Services", href: "#services" },
		{ label: "Our Work", href: "#work" },
		{ label: "Pricing", href: "#pricing" },
		{ label: "Contact", href: "#contact" },
	] as FooterLink[],
	resources: [
		{ label: "Blog Admin", href: "/blog/admin", isPage: true },
		{ label: "Pricing", href: "#pricing" },
		{ label: "Process", href: "#process" },
	] as FooterLink[],
	social: [
		{
			icon: SiInstagram,
			label: "Instagram",
			href: "https://www.instagram.com/onestop_software",
		},
		{
			icon: SiLinkedin,
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/onestop-software",
		},
		{ icon: SiX, label: "X", href: "https://x.com/onestop_team" },
	],
};

function AnimatedLink({
	link,
	onClick,
}: {
	link: FooterLink;
	onClick: () => void;
}) {
	const [isHovered, setIsHovered] = useState(false);

	if (link.isPage) {
		return (
			<Link
				href={link.href}
				className="relative text-muted-foreground hover:text-foreground transition-colors text-sm inline-block"
				data-testid={`link-footer-${link.label
					.toLowerCase()
					.replace(/\s+/g, "-")}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<motion.span
					animate={{ x: isHovered ? 3 : 0 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					{link.label}
				</motion.span>
				<motion.div
					className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary to-purple-500"
					initial={{ width: 0 }}
					animate={{ width: isHovered ? "100%" : 0 }}
					transition={{ duration: 0.2 }}
				/>
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			className="relative text-muted-foreground hover:text-foreground transition-colors text-sm inline-block text-left"
			data-testid={`link-footer-${link.label
				.toLowerCase()
				.replace(/\s+/g, "-")}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.span
				animate={{ x: isHovered ? 3 : 0 }}
				transition={{ type: "spring", stiffness: 300 }}
			>
				{link.label}
			</motion.span>
			<motion.div
				className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary to-purple-500"
				initial={{ width: 0 }}
				animate={{ width: isHovered ? "100%" : 0 }}
				transition={{ duration: 0.2 }}
			/>
		</button>
	);
}

function SocialButton({ social }: { social: (typeof footerLinks.social)[0] }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.a
			href={social.href}
			target="_blank"
			rel="noopener noreferrer"
			className={`w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-300 ${
				isHovered ? "text-foreground bg-primary/10 glow-sm" : "bg-muted"
			}`}
			data-testid={`link-social-${social.label.toLowerCase()}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ scale: 1.1, y: -2 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
				transition={{ duration: 0.3 }}
			>
				<social.icon className="w-5 h-5" />
			</motion.div>
			<span className="sr-only">{social.label}</span>
		</motion.a>
	);
}

export function Footer() {
	const router = useRouter();

	const handleLinkClick = (link: FooterLink) => {
		if (link.href.startsWith("#")) {
			const element = document.querySelector(link.href);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
			return;
		}

		router.push(link.href);
	};

	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-card border-t border-border relative overflow-hidden">
			<motion.div
				className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
				}}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="lg:col-span-1"
					>
						<Link
							href="/"
							className="flex items-center gap-2 mb-4 group"
							data-testid="link-footer-logo"
						>
							<motion.div
								className="w-10 h-10 rounded-lg overflow-hidden relative"
								whileHover={{ rotate: 5, scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<Image
									src="/logo.png"
									alt="OneStop Logo"
									width={40}
									height={40}
									className="w-full h-full object-cover"
								/>
							</motion.div>
							<span className="font-display font-bold text-2xl">
								<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
									One
								</span>
								<span className="text-foreground group-hover:text-primary transition-colors duration-300">
									Stop
								</span>
							</span>
						</Link>
						<p className="text-muted-foreground text-sm leading-relaxed mb-6">
							We build digital experiences that drive growth and
							innovation. Transform your vision into reality with
							our expert team.
						</p>
						<div className="flex items-center gap-3">
							{footerLinks.social.map((social) => (
								<SocialButton
									key={social.label}
									social={social}
								/>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<h3 className="font-display font-semibold text-foreground mb-4">
							Services
						</h3>
						<ul className="space-y-3">
							{footerLinks.services.map((link, index) => (
								<motion.li
									key={link.label}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 + index * 0.05 }}
									viewport={{ once: true }}
								>
									<AnimatedLink
										link={link}
										onClick={() => handleLinkClick(link)}
									/>
								</motion.li>
							))}
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<h3 className="font-display font-semibold text-foreground mb-4">
							Company
						</h3>
						<ul className="space-y-3">
							{footerLinks.company.map((link, index) => (
								<motion.li
									key={link.label}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 + index * 0.05 }}
									viewport={{ once: true }}
								>
									<AnimatedLink
										link={link}
										onClick={() => handleLinkClick(link)}
									/>
								</motion.li>
							))}
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<h3 className="font-display font-semibold text-foreground mb-4">
							Contact
						</h3>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<motion.a
									href="mailto:hello@onestop.com"
									className="hover:text-foreground transition-colors inline-block"
									data-testid="link-footer-email"
									whileHover={{ x: 3 }}
								>
									contact.onestophq@gmail.com
								</motion.a>
							</li>
							<li>
								<motion.a
									href="tel:+919394070912"
									className="hover:text-foreground transition-colors inline-block"
									data-testid="link-footer-phone"
									whileHover={{ x: 3 }}
								>
									+91 9394070912
								</motion.a>
							</li>
							<li>
								<motion.a
									href="tel:+916900100109"
									className="hover:text-foreground transition-colors inline-block"
									data-testid="link-footer-phone"
									whileHover={{ x: 3 }}
								>
									+91 6900100109
								</motion.a>
							</li>
							<li>Guwahati, Assam</li>
							<li>Mon - Fri: 9AM - 6PM PST</li>
						</ul>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
				>
					<p className="text-sm text-muted-foreground">
						{currentYear} OneStop. All rights reserved.
					</p>
					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						<motion.a
							href="#"
							className="hover:text-foreground transition-colors"
							data-testid="link-privacy"
							whileHover={{ y: -2 }}
						>
							Privacy Policy
						</motion.a>
						<motion.a
							href="#"
							className="hover:text-foreground transition-colors"
							data-testid="link-terms"
							whileHover={{ y: -2 }}
						>
							Terms of Service
						</motion.a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
