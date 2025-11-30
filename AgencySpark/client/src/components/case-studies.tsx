import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ecommerceImage from "@assets/generated_images/e-commerce_project_mockup.png";
import saasImage from "@assets/generated_images/saas_dashboard_project_mockup.png";
import healthcareImage from "@assets/generated_images/healthcare_app_project_mockup.png";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    client: "RetailMax",
    description:
      "A complete e-commerce solution with real-time inventory, AI-powered recommendations, and seamless checkout experience.",
    image: ecommerceImage,
    metrics: [
      { label: "Revenue Increase", value: "340%" },
      { label: "User Retention", value: "85%" },
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    featured: true,
  },
  {
    id: 2,
    title: "SaaS Analytics Dashboard",
    client: "DataFlow Inc",
    description:
      "Enterprise-grade analytics platform with real-time data visualization and custom reporting.",
    image: saasImage,
    metrics: [
      { label: "Data Processing", value: "10M+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tags: ["React", "Node.js", "AWS", "D3.js"],
    featured: false,
  },
  {
    id: 3,
    title: "Healthcare Mobile App",
    client: "MedConnect",
    description:
      "HIPAA-compliant mobile app for patient management and telemedicine consultations.",
    image: healthcareImage,
    metrics: [
      { label: "App Downloads", value: "500K+" },
      { label: "User Rating", value: "4.9" },
    ],
    tags: ["React Native", "Firebase", "HealthKit"],
    featured: false,
  },
];

export function CaseStudies() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Featured Case Studies
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Real results for real businesses. Explore how we've helped our
            clients achieve their digital transformation goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <Card
                className="group h-full overflow-hidden hover-elevate transition-all duration-300 cursor-pointer border-border/50"
                data-testid="card-project-featured"
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {featured.client}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                    <ArrowUpRight className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-6 mb-6">
                    {featured.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-2xl font-bold text-primary">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {others.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <Card
                className="group h-full overflow-hidden hover-elevate transition-all duration-300 cursor-pointer border-border/50"
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-sm text-muted-foreground">
                    {project.client}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                    <ArrowUpRight className="inline-block w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-lg font-bold text-primary">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
