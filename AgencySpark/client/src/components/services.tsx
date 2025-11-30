import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Smartphone,
  Cloud,
  Search,
  Target,
  Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks like React, Next.js, and Vue. Responsive, fast, and scalable solutions.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences on every device.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure on AWS, Azure, and Google Cloud. Secure, reliable, and cost-effective deployments.",
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description:
      "Data-driven SEO strategies and digital marketing campaigns that increase visibility and drive organic growth.",
  },
  {
    icon: Target,
    title: "Lead Generation",
    description:
      "Comprehensive lead generation systems that capture, nurture, and convert prospects into loyal customers.",
  },
  {
    icon: Wrench,
    title: "Ongoing Maintenance",
    description:
      "Proactive maintenance and support services to keep your software running smoothly and securely 24/7.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Comprehensive Digital Services
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From concept to deployment, we offer end-to-end solutions that help
            businesses thrive in the digital age.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card
                className="group p-8 h-full hover-elevate transition-all duration-300 cursor-pointer border-border/50"
                data-testid={`card-service-${index}`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
