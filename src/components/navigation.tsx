"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type NavItem = {
	label: string;
	href: string;
	isPage?: boolean;
};

const navItems: NavItem[] = [
	{ label: "Home", href: "#home" },
	{ label: "Services", href: "#services" },
	{ label: "Work", href: "#work" },
	{ label: "Pricing", href: "#pricing" },
	// { label: "Blog", href: "/blog", isPage: true },
	{ label: "About", href: "/about", isPage: true },
	{ label: "Contact", href: "#contact" },
];

export function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const hash = window.location.hash;
		if (!hash) return;

		const el = document.querySelector(hash);
		if (!el) return;

		requestAnimationFrame(() => {
			el.scrollIntoView({ behavior: "smooth" });
		});
	}, [pathname]);

	const handleNavClick = (item: NavItem) => {
		if (item.isPage) {
			router.push(item.href);
		} else {
			if (pathname !== "/") {
				router.push(`/${item.href}`); // -> "/#services"
			} else {
				const el = document.querySelector(item.href);
				if (el) el.scrollIntoView({ behavior: "smooth" });
			}
		}

		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
					isScrolled
						? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/5"
						: "bg-transparent"
				}`}
			>
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 md:h-20">
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Link
								href="/"
								className="flex items-center gap-2 group"
								data-testid="link-logo"
							>
								<motion.div
									className="w-10 h-10 rounded-lg overflow-hidden relative"
									whileHover={{ rotate: 5 }}
									transition={{
										type: "spring",
										stiffness: 300,
									}}
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
						</motion.div>

						<div className="hidden md:flex items-center gap-1 relative">
							{navItems.map((item, index) => (
								<motion.button
									key={item.label}
									onClick={() => handleNavClick(item)}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
									className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
									whileTap={{ scale: 0.95 }}
									data-testid={`link-nav-${item.label.toLowerCase()}`}
								>
									{hoveredIndex === index && (
										<motion.div
											className="absolute inset-0 bg-primary/10 rounded-lg"
											layoutId="navbar-hover"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{
												type: "spring",
												stiffness: 350,
												damping: 30,
											}}
										/>
									)}
									<span className="relative z-10">
										{item.label}
									</span>
								</motion.button>
							))}
						</div>

						<div className="hidden md:flex items-center gap-3">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setTheme(
											theme === "dark" ? "light" : "dark"
										)
									}
									className="relative overflow-hidden"
									data-testid="button-theme-toggle"
								>
									<motion.div
										initial={false}
										animate={{
											rotate: theme === "dark" ? 180 : 0,
										}}
										transition={{
											duration: 0.5,
											type: "spring",
										}}
									>
										<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
										<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:-rotate-180 dark:scale-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
									</motion.div>
									<span className="sr-only">
										Toggle theme
									</span>
								</Button>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									onClick={() =>
										handleNavClick({
											label: "Contact",
											href: "#contact",
										})
									}
									className="font-medium relative overflow-hidden group"
									data-testid="button-get-started"
								>
									<span className="relative z-10">
										Get Started
									</span>
									<motion.div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</Button>
							</motion.div>
						</div>

						<div className="flex md:hidden items-center gap-2">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setTheme(
											theme === "dark" ? "light" : "dark"
										)
									}
									data-testid="button-theme-toggle-mobile"
								>
									<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								</Button>
							</motion.div>
							<motion.div whileTap={{ scale: 0.9 }}>
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setIsMobileMenuOpen(!isMobileMenuOpen)
									}
									data-testid="button-mobile-menu"
								>
									<AnimatePresence mode="wait">
										{isMobileMenuOpen ? (
											<motion.div
												key="close"
												initial={{
													rotate: -90,
													opacity: 0,
												}}
												animate={{
													rotate: 0,
													opacity: 1,
												}}
												exit={{
													rotate: 90,
													opacity: 0,
												}}
												transition={{ duration: 0.2 }}
											>
												<X className="h-5 w-5" />
											</motion.div>
										) : (
											<motion.div
												key="menu"
												initial={{
													rotate: 90,
													opacity: 0,
												}}
												animate={{
													rotate: 0,
													opacity: 1,
												}}
												exit={{
													rotate: -90,
													opacity: 0,
												}}
												transition={{ duration: 0.2 }}
											>
												<Menu className="h-5 w-5" />
											</motion.div>
										)}
									</AnimatePresence>
								</Button>
							</motion.div>
						</div>
					</div>
				</nav>
			</motion.header>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 md:hidden pt-20"
					>
						<motion.div
							className="absolute inset-0 bg-background/95 backdrop-blur-xl"
							onClick={() => setIsMobileMenuOpen(false)}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
						<motion.nav
							className="relative bg-card/80 backdrop-blur-lg border-b border-border/50"
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="px-4 py-6 space-y-1">
								{navItems.map((item, index) => (
									<motion.button
										key={item.label}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ delay: index * 0.05 }}
										onClick={() => handleNavClick(item)}
										className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:translate-x-2"
										data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
									>
										{item.label}
									</motion.button>
								))}
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{
										delay: navItems.length * 0.05,
									}}
									className="pt-4"
								>
									<Button
										onClick={() =>
											handleNavClick({
												label: "Contact",
												href: "#contact",
											})
										}
										className="w-full font-medium"
										data-testid="button-get-started-mobile"
									>
										Get Started
									</Button>
								</motion.div>
							</div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
