import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { CaseStudies } from "@/components/case-studies";
import { TechStack } from "@/components/tech-stack";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";
import { PricingCalculator } from "@/components/pricing-calculator";
import { Contact } from "@/components/contact";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <TechStack />
        <Process />
        <Testimonials />
        <Stats />
        <PricingCalculator />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
