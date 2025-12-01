"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
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
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiAmazon, name: "AWS", color: "#FF9900" },
  { icon: SiGooglecloud, name: "Google Cloud", color: "#4285F4" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiRedis, name: "Redis", color: "#DC382D" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiGithub, name: "GitHub", color: "#181717" },
  { icon: SiVercel, name: "Vercel", color: "#000000" },
];

const firstRow = technologies.slice(0, 8);
const secondRow = technologies.slice(8, 16);

function TechItem({
  tech,
  index,
  rowIndex,
}: {
  tech: (typeof technologies)[0];
  index: number;
  rowIndex: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-background border border-border/50 min-w-max cursor-pointer transition-all duration-300 ${
        isHovered ? "border-primary/30 glow-sm" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -3 }}
      data-testid={
        rowIndex === 0
          ? `tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}-${index}`
          : `tech-row2-${tech.name.toLowerCase().replace(/\s+/g, "-")}-${index}`
      }
    >
      <div
        className="transition-all duration-300"
        style={{ color: isHovered ? tech.color : "#71717a" }}
      >
        <motion.div
          animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          <tech.icon className="w-8 h-8" />
        </motion.div>
      </div>
      <motion.span
        className="font-medium text-foreground"
        animate={{ x: isHovered ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
}

export function TechStack() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="py-20 md:py-32 bg-card/50 overflow-hidden relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            className="text-primary font-medium text-sm tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            viewport={{ once: true }}
          >
            Our Tech Stack
          </motion.span>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Built With <span className="gradient-text">Modern Technologies</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We use cutting-edge technologies to deliver fast, scalable, and
            maintainable solutions.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {prefersReducedMotion ? (
          <div className="flex flex-col gap-8 px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {technologies.map((tech, index) => (
                <TechItem
                  key={`${tech.name}-${index}`}
                  tech={tech}
                  index={index}
                  rowIndex={0}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <motion.div
              className="flex"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <div className="flex gap-8 pr-8">
                {[...firstRow, ...firstRow, ...firstRow].map((tech, index) => (
                  <TechItem
                    key={`${tech.name}-${index}`}
                    tech={tech}
                    index={index}
                    rowIndex={0}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex"
              animate={{ x: [-500, 0] }}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <div className="flex gap-8 pr-8">
                {[...secondRow, ...secondRow, ...secondRow].map((tech, index) => (
                  <TechItem
                    key={`${tech.name}-${index}`}
                    tech={tech}
                    index={index}
                    rowIndex={1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
