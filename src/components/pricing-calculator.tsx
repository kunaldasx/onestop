"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cloud,
  Search,
  Target,
  Wrench,
  Check,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ServiceOption {
  id: string;
  name: string;
  icon: typeof Globe;
  basePrice: number;
  description: string;
  features: string[];
}

const services: ServiceOption[] = [
  {
    id: "web",
    name: "Web Development",
    icon: Globe,
    basePrice: 5000,
    description: "Custom web applications built with modern frameworks",
    features: [
      "Responsive design",
      "SEO optimization",
      "CMS integration",
      "Analytics setup",
    ],
  },
  {
    id: "mobile",
    name: "Mobile App",
    icon: Smartphone,
    basePrice: 8000,
    description: "Native and cross-platform mobile applications",
    features: [
      "iOS & Android",
      "Push notifications",
      "Offline support",
      "App store submission",
    ],
  },
  {
    id: "cloud",
    name: "Cloud Solutions",
    icon: Cloud,
    basePrice: 3000,
    description: "Scalable cloud infrastructure and migration",
    features: [
      "AWS/GCP/Azure",
      "Auto-scaling",
      "Security hardening",
      "24/7 monitoring",
    ],
  },
  {
    id: "seo",
    name: "SEO & Marketing",
    icon: Search,
    basePrice: 2000,
    description: "Data-driven SEO and digital marketing strategies",
    features: [
      "Keyword research",
      "Content strategy",
      "Link building",
      "Monthly reports",
    ],
  },
  {
    id: "leads",
    name: "Lead Generation",
    icon: Target,
    basePrice: 2500,
    description: "Comprehensive lead capture and nurturing systems",
    features: [
      "Landing pages",
      "Email automation",
      "CRM integration",
      "A/B testing",
    ],
  },
  {
    id: "maintenance",
    name: "Ongoing Maintenance",
    icon: Wrench,
    basePrice: 1000,
    description: "Proactive maintenance and support services",
    features: [
      "Bug fixes",
      "Security updates",
      "Performance optimization",
      "Priority support",
    ],
  },
];

const complexityMultipliers = [
  { label: "Basic", value: 1, description: "Simple, straightforward project" },
  { label: "Standard", value: 1.5, description: "Moderate complexity with custom features" },
  { label: "Advanced", value: 2.5, description: "Complex project with integrations" },
  { label: "Enterprise", value: 4, description: "Large-scale, mission-critical solution" },
];

export function PricingCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [complexity, setComplexity] = useState(1);
  const [timeline, setTimeline] = useState([3]);
  const [includeSupport, setIncludeSupport] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const estimatedPrice = useMemo(() => {
    const baseTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.basePrice || 0);
    }, 0);

    const complexityMultiplier = complexityMultipliers[complexity].value;
    const timelineMultiplier = timeline[0] <= 1 ? 1.5 : timeline[0] <= 2 ? 1.25 : 1;
    const supportCost = includeSupport ? 500 * timeline[0] : 0;

    return Math.round(baseTotal * complexityMultiplier * timelineMultiplier + supportCost);
  }, [selectedServices, complexity, timeline, includeSupport]);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Pricing Calculator
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Estimate Your Project Cost
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get an instant estimate for your project. Select the services you
            need and customize the options to see your personalized quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <Card className="p-6 border-border/50">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Select Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`button-service-${service.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <service.icon
                            className={`w-5 h-5 ${
                              isSelected ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">
                              {service.name}
                            </span>
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                                >
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            From ${service.basePrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Project Complexity
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {complexityMultipliers.map((level, index) => (
                  <motion.button
                    key={level.label}
                    onClick={() => setComplexity(index)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      complexity === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`button-complexity-${level.label.toLowerCase()}`}
                  >
                    <span
                      className={`font-medium ${
                        complexity === index ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {level.label}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level.value}x
                    </p>
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {complexityMultipliers[complexity].description}
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Timeline (Months)
              </h3>
              <div className="space-y-4">
                <Slider
                  value={timeline}
                  onValueChange={setTimeline}
                  min={1}
                  max={12}
                  step={1}
                  className="py-4"
                  data-testid="slider-timeline"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 month (Rush)</span>
                  <span className="font-medium text-foreground">
                    {timeline[0]} {timeline[0] === 1 ? "month" : "months"}
                  </span>
                  <span>12 months</span>
                </div>
                {timeline[0] <= 2 && (
                  <Badge variant="secondary" className="text-xs">
                    Rush delivery adds 25-50% to cost
                  </Badge>
                )}
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Priority Support
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    24/7 dedicated support and faster response times
                  </p>
                </div>
                <Switch
                  checked={includeSupport}
                  onCheckedChange={setIncludeSupport}
                  data-testid="switch-support"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Your Estimate
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your selections
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Selected Services</span>
                  <span className="font-medium text-foreground">
                    {selectedServices.length}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Complexity</span>
                  <span className="font-medium text-foreground">
                    {complexityMultipliers[complexity].label}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Timeline</span>
                  <span className="font-medium text-foreground">
                    {timeline[0]} {timeline[0] === 1 ? "month" : "months"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Priority Support</span>
                  <span className="font-medium text-foreground">
                    {includeSupport ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  Estimated Investment
                </p>
                <motion.div
                  key={estimatedPrice}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-4xl md:text-5xl font-bold text-primary"
                >
                  ${estimatedPrice.toLocaleString()}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Final price may vary based on specific requirements
                </p>
              </div>

              {selectedServices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Included Features:
                  </h4>
                  <ul className="space-y-2">
                    {selectedServices.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId);
                      return service?.features.map((feature, idx) => (
                        <li
                          key={`${serviceId}-${idx}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ));
                    })}
                  </ul>
                </motion.div>
              )}

              <Button
                onClick={scrollToContact}
                className="w-full gap-2 group"
                size="lg"
                disabled={selectedServices.length === 0}
                data-testid="button-get-quote"
              >
                Get Detailed Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
