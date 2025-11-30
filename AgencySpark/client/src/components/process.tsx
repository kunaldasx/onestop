import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Lightbulb, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discovery",
    description:
      "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description:
      "Our designers craft intuitive user interfaces and experiences that align with your brand and delight your users.",
  },
  {
    number: "03",
    icon: Code,
    title: "Development",
    description:
      "Our engineers build robust, scalable solutions using modern technologies and best practices.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy your solution with thorough testing, monitoring, and ongoing support to ensure success.",
  },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            How We Work
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A proven methodology that transforms ideas into successful digital
            products.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 origin-left"
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
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="relative z-10 w-20 h-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center mb-6"
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <span className="text-5xl font-display font-bold text-primary/20 mb-2">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
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
