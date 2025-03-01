"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, ArrowRight, Award, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";
import { motion } from "framer-motion";

export function About() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-0 top-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" 
        />
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 bottom-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" 
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-3 h-3 mr-2 text-primary" />
            About Me
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building AI-Driven Solutions &{" "}
            <motion.span 
              className="text-primary relative inline-block"
              initial={{ backgroundSize: "0% 3px" }}
              whileInView={{ backgroundSize: "100% 3px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)))",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat"
              }}
            >
              Scalable Architectures
            </motion.span>
          </h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
          >
            AI Engineer and Backend Architect specializing in AI/ML solutions, RAG pipelines, and AI Agents with scalable cloud architectures
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-16">
          {/* Professional Summary */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2"
          >
            <Card className="p-6 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-3 mb-6 relative">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                  className={`p-2 rounded-lg bg-primary/10`}
                >
                  <GraduationCap className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-semibold">Background</h3>
              </div>
              
              <motion.p 
                className="text-muted-foreground leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                As an AI Engineer and Backend Architect, I specialize in developing AI/ML solutions, RAG pipelines, and AI Agents, seamlessly integrating them with scalable cloud architectures. My expertise lies in building robust backend systems, optimizing AI deployments, and crafting intelligent solutions that drive real-world impact.
              </motion.p>
              
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-6 space-y-3"
              >
                <h4 className="text-sm font-medium text-primary flex items-center gap-2">
                  <Award className="h-4 w-4" /> Key Expertise
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Developing AI-driven solutions that integrate LLMs, RAG pipelines, and AI Agents into scalable systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Building robust backend architectures with FastAPI, Node.js, and cloud technologies</span>
                  </li>
                </ul>
              </motion.div>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3 grid sm:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                custom={index}
                variants={fadeInUp}
              >
                <Card
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={`p-2 rounded-lg ${category.color}`}
                    >
                      <category.Icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + skillIndex * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="outline"
                          className={`${category.color} hover:scale-105 transition-transform cursor-default`}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <Link
            href="/about"
            className="group inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all relative overflow-hidden"
          >
            <span className="relative z-10">Learn More About Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
