"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Lightbulb, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discovery",
    description:
      "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description:
      "Our designers craft intuitive user interfaces and experiences that align with your brand and delight your users.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    number: "03",
    icon: Code,
    title: "Development",
    description:
      "Our engineers build robust, scalable solutions using modern technologies and best practices.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy your solution with thorough testing, monitoring, and ongoing support to ensure success.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="process" className="py-20 md:py-32 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Our Process
          </motion.span>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How We <span className="gradient-text">Work</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A proven methodology that transforms ideas into successful digital
            products.
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2" />

          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary -translate-y-1/2 origin-left rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
                data-testid={`step-${step.number}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col items-center text-center group">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                    }}
                    className="relative z-10"
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} p-[2px] mb-6`}
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <motion.div
                          animate={{
                            rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <step.icon className="w-8 h-8 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full blur-xl opacity-30"
                        style={{
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>

                  <motion.span
                    className={`text-5xl font-display font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-30 mb-2`}
                    animate={{
                      opacity: hoveredIndex === index ? 0.6 : 0.3,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.span>

                  <motion.h3
                    className="font-display text-xl font-semibold text-foreground mb-3"
                    animate={{
                      y: hoveredIndex === index ? -3 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.title}
                  </motion.h3>

                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
