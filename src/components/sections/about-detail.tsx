"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Brain,
  Cloud,
  Code,
  Building2,
  GraduationCap,
  Award,
  Sparkles,
  ChevronDown,
  Layers,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/certifications";
import { experiences, previousExperiences } from "@/data/experience";
import { education } from "@/data/education";
import { hobbies } from "@/data/hobbies";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay,
      duration: 0.8,
    }}
    className={cn("absolute", className)}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ icon: Icon, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="flex items-center gap-3 mb-8"
    >
      <motion.div
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
        className="rounded-full bg-primary/10 p-2.5"
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <motion.h2
        variants={{
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold relative"
      >
        {title}
        <motion.span
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-primary/80 to-primary/10"
        />
      </motion.h2>
    </motion.div>
  );
};

export function AboutDetail() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03]" />
        <FloatingElement delay={0.2} className="top-[15%] left-[5%] hidden md:block">
          <div className="w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={0.3} className="top-[40%] right-[8%] hidden md:block">
          <div className="w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={0.4} className="bottom-[20%] left-[10%] hidden md:block">
          <div className="w-24 h-24 rounded-full bg-primary/5 blur-3xl" />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative mb-24 md:mb-32"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/10 relative z-10">
                <Image
                  src="/headshot/headshot-2024.jpg"
                  alt="Bjorn Melin"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl -z-10 scale-[0.85]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Bjorn Melin
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Senior Data Scientist & Cloud Solutions Architect
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-2"
              >
                {[
                  { icon: Cloud, text: "AWS Certified" },
                  { icon: Brain, text: "AI/ML Expert" },
                  { icon: Building2, text: "Cloud Architect" },
                  { icon: Code, text: "Full-Stack Developer" },
                  { icon: Sparkles, text: "Generative AI Evangelist" },
                ].map((badge, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Badge
                      variant="outline"
                      className="bg-primary/5 border-primary/10 px-3 py-1.5 text-sm"
                    >
                      <badge.icon className="w-3.5 h-3.5 mr-2 text-primary" />
                      <span>{badge.text}</span>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Professional Summary */}
        <section className="mb-24 md:mb-32">
          <SectionHeader icon={Building2} title="Professional Summary" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 backdrop-blur-xl bg-card/30 border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
                <p>
                  AI Engineer and Machine Learning Engineer based in Salt Lake City, specializing in deep learning, generative AI,
                  and LLM applications. With a proven track record of delivering multi-million-dollar solutions, I bring 
                  expertise in building scalable, cost-effective systems on AWS and transforming
                  operations through efficient, reliable, and strategically designed solutions.
                </p>
                <p>
                  My recent achievements include leading a high-profile neuro-symbolic AI project that reduced training data needs
                  by 40% and solved complex material science challenges. I successfully migrated 3M&apos;s Corporate Research Analytical
                  Lab&apos;s infrastructure to AWS, cutting cloud costs by 60% and establishing scalable frameworks for manufacturing
                  and divisional teams.
                </p>
                <p>
                  With multiple AWS certifications and a strong foundation in Mathematics and Computer Science from Augsburg University,
                  I&apos;ve evolved from software engineering to become a leader in cloud architecture and data science.
                </p>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="mb-24 md:mb-32">
          <SectionHeader icon={Code} title="Skills & Expertise" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-5 backdrop-blur-xl bg-card/30 border-primary/10 h-full hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/5">
                      <category.Icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-primary/5 text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Work Experience */}
        <section className="mb-24 md:mb-32">
          <SectionHeader icon={Building2} title="Work Experience" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${exp.startDate}`}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-5 backdrop-blur-xl bg-card/30 border-primary/10 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{exp.title}</h3>
                      <p className="text-primary text-sm">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {exp.location}{exp.isRemote ? " (Remote)" : ""}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 md:mt-0">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground text-sm ml-4">
                    {exp.achievements.slice(0, 3).map((achievement, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2 text-primary">•</span>
                        <span className="flex-1">{achievement.text}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.skills.slice(0, 6).map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/5 text-xs font-normal">
                          {skill.name}
                        </Badge>
                      ))}
                      {exp.skills.length > 6 && (
                        <span className="text-xs text-muted-foreground flex items-center">
                          +{exp.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp}>
              <Card className="p-5 backdrop-blur-xl bg-card/30 border-primary/10">
                <h3 className="text-lg font-medium mb-4">Previous Experience</h3>
                <div className="space-y-3">
                  {previousExperiences.map((exp) => (
                    <div key={`${exp.title}-${exp.startDate}`} className="border-l-2 border-primary/10 pl-4 py-1">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium text-sm">{exp.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Certifications */}
        <section className="mb-24 md:mb-32">
          <SectionHeader icon={Award} title="AWS Certifications" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-4 backdrop-blur-xl bg-card/30 border-primary/10 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-3">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3"
                    >
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium text-sm mb-1">{cert.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cert.issuedBy}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {cert.issuedDate}
                        </p>
                      </div>
                    </a>

                    {cert.earlyAdopterBadge && (
                      <>
                        <div className="border-t border-primary/10 my-1" />
                        <a
                          href={cert.earlyAdopterBadge.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={cert.earlyAdopterBadge.image}
                            alt={cert.earlyAdopterBadge.name}
                            width={30}
                            height={30}
                            className="rounded-lg"
                          />
                          <div>
                            <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
                              Early Adopter
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {cert.earlyAdopterBadge.name}
                            </p>
                          </div>
                        </a>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Education */}
        <section className="mb-24 md:mb-32">
          <SectionHeader icon={GraduationCap} title="Education" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-5 md:p-6 backdrop-blur-xl bg-card/30 border-primary/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="space-y-5 relative z-10">
                <div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-base">{education.degree}</h3>
                      <p className="text-sm text-muted-foreground">{education.school}</p>
                    </div>
                    <div className="text-right mt-1 md:mt-0">
                      <p className="text-xs text-muted-foreground">
                        {education.startDate} - {education.endDate}
                      </p>
                      <p className="text-xs font-medium text-primary">
                        GPA: {education.gpa}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    {education.honors.map((honor, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`bg-primary/5 text-xs font-normal mb-1.5 ${index > 0 ? "ml-1.5" : ""}`}
                      >
                        {honor.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1.5">Activities and Societies:</p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 ml-1.5">
                      {education.activities.map((activity, index) => (
                        <li key={index}>{activity.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Hobbies & Interests */}
        <section>
          <SectionHeader icon={Layers} title="Hobbies & Interests" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {hobbies.map((hobby, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-4 backdrop-blur-xl bg-card/30 border-primary/10 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-sm py-1.5 px-2.5 w-fit">
                      {hobby.emoji} {hobby.name}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {hobby.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}