"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

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
  ] as FooterLink[],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Blog", href: "/blog", isPage: true },
    { label: "Contact", href: "#contact" },
  ] as FooterLink[],
  resources: [
    { label: "Blog Admin", href: "/blog/admin", isPage: true },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
  ] as FooterLink[],
  social: [
    { icon: SiGithub, label: "GitHub", href: "https://github.com" },
    { icon: SiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: SiX, label: "X", href: "https://x.com" },
  ],
};

export function Footer() {
  const handleLinkClick = (link: FooterLink) => {
    if (link.isPage) {
      return;
    }
    if (link.href.startsWith("#")) {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderFooterLink = (link: FooterLink) => {
    if (link.isPage) {
      return (
        <Link
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <button
        onClick={() => handleLinkClick(link)}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {link.label}
      </button>
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
              className="flex items-center gap-2 mb-4"
              data-testid="link-footer-logo"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                NexaTech
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We build digital experiences that drive growth and innovation.
              Transform your vision into reality with our expert team.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
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
              {footerLinks.services.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
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
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
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
                <a
                  href="mailto:hello@nexatech.com"
                  className="hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                >
                  hello@nexatech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="hover:text-foreground transition-colors"
                  data-testid="link-footer-phone"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>San Francisco, CA</li>
              <li>Mon - Fri: 9AM - 6PM PST</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            {currentYear} NexaTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:text-foreground transition-colors"
              data-testid="link-privacy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-foreground transition-colors"
              data-testid="link-terms"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
