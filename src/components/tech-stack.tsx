"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiVercel,
} from "react-icons/si";

const technologies = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPython, name: "Python" },
  { icon: SiAmazon, name: "AWS" },
  { icon: SiGooglecloud, name: "Google Cloud" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiRedis, name: "Redis" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiVercel, name: "Vercel" },
];

const firstRow = technologies.slice(0, 8);
const secondRow = technologies.slice(8, 16);

export function TechStack() {
  return (
    <section className="py-20 md:py-32 bg-card/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Tech Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Built With Modern Technologies
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We use cutting-edge technologies to deliver fast, scalable, and
            maintainable solutions.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card/50 to-transparent z-10" />

        <div className="flex flex-col gap-8">
          <div className="flex animate-scroll-left">
            <div className="flex gap-8 pr-8">
              {[...firstRow, ...firstRow].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-background border border-border/50 min-w-max"
                  data-testid={`tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}-${index}`}
                >
                  <tech.icon className="w-8 h-8 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex animate-scroll-right">
            <div className="flex gap-8 pr-8">
              {[...secondRow, ...secondRow].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-background border border-border/50 min-w-max"
                  data-testid={`tech-row2-${tech.name.toLowerCase().replace(/\s+/g, "-")}-${index}`}
                >
                  <tech.icon className="w-8 h-8 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
