"use client";

import { ProjectGrid } from "@/components/projects/project-grid";
import { projectsData } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export function ProjectsContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents hydration errors
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: 100, y: -50 }}
        animate={{ opacity: 0.15, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-20 right-[5%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-primary/30 via-primary/5 to-transparent blur-3xl -z-10" 
      />
      
      <motion.div 
        initial={{ opacity: 0, x: -100, y: 50 }}
        animate={{ opacity: 0.1, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-20 left-[5%] w-[20rem] h-[20rem] rounded-full bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl -z-10" 
      />
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-24">
          {/* Left Content */}
          <motion.div 
            className="flex-1 space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex">
              <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm font-medium border-primary/20 bg-primary/5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Portfolio Showcase</span>
              </Badge>
            </motion.div>
            
            {/* Heading */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                My <span className="text-gradient">Creative</span> <br className="hidden md:block" />
                <span className="relative">
                  Projects
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Explore my portfolio showcasing innovative solutions in machine learning, 
              cloud architecture, and web development — each project representing my 
              passion for creating impactful digital experiences.
            </motion.p>
            
            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold">{projectsData.length}</div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold">{projectsData.filter(p => p.featured).length}</div>
                <div className="text-sm text-muted-foreground">Featured Works</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold">{new Set(projectsData.map(p => p.category)).size}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Decorative Element */}
          <motion.div 
            className="flex-1 relative h-[400px] w-full max-w-[500px] mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] rounded-2xl"></div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute top-[15%] left-[20%] w-24 h-24 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Code className="w-10 h-10 text-primary/70" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            >
              <Star className="w-12 h-12 text-primary/70" />
            </motion.div>
            
            <motion.div 
              className="absolute top-[60%] left-[60%] w-16 h-16 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center rotate-12"
              animate={{ rotate: [12, -5, 12] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-6 h-6 bg-primary/30 rounded-sm"></div>
            </motion.div>
            
            {/* Central Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20 flex items-center justify-center">
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent rounded-xl"
                animate={{ 
                  rotate: [0, 180],
                  borderRadius: ["20% 50% 30% 70%", "50% 20% 70% 30%", "20% 50% 30% 70%"]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Project Instruction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="glass px-5 py-3 rounded-full flex items-center gap-2 text-sm">
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
            <span>Filter by category or search for specific technologies</span>
          </div>
        </motion.div>
        
        {/* Project Grid */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <ProjectGrid projects={projectsData} />
        </motion.div>
      </div>
    </section>
  );
}
