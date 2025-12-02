"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  ArrowRight,
  Code2,
  Rocket,
  Heart,
  Shield,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description:
      "We work as an extension of your team, ensuring your success is our primary goal.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Every line of code is crafted with precision and tested rigorously for reliability.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description:
      "We love what we do, and that passion translates into exceptional results for our clients.",
  },
];

const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "200+", label: "Projects Completed" },
  { value: "15+", label: "Team Members" },
  { value: "5+", label: "Years Experience" },
];

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    initials: "AC",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Sarah Miller",
    role: "CTO",
    initials: "SM",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "James Wilson",
    role: "Lead Designer",
    initials: "JW",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    initials: "ER",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
              Building the Future of{" "}
              <span className="gradient-text">Digital Innovation</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're a team of passionate developers, designers, and strategists
              dedicated to creating exceptional digital experiences that drive
              business growth.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-24"
          >
            <Card className="p-8 md:p-12 border-border/50 overflow-hidden relative">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    At OneStop, we believe technology should empower businesses,
                    not complicate them. Our mission is to bridge the gap
                    between complex technical solutions and real-world business
                    needs.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Founded with a vision to make premium software development
                    accessible to businesses of all sizes, we've grown into a
                    full-service digital agency that partners with companies
                    worldwide to bring their ideas to life.
                  </p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 rounded-lg overflow-hidden border border-border/50"
                  >
                    <Image
                      src="/about-team.jpg"
                      alt="OneStop team collaborating"
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="text-center p-6 rounded-xl bg-card border border-border/50"
                    >
                      <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape how we work
                with our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full border-border/50 hover-elevate transition-all">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Talented individuals working together to create amazing digital
                experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center border-border/50 hover-elevate transition-all">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-xl font-bold text-white">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 text-center border-border/50 bg-primary/5">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss how we can help bring your vision to life. Our
                team is ready to tackle your next big challenge.
              </p>
              <Link href="/#contact">
                <Button size="lg" className="font-medium">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
