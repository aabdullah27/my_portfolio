"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "../shared/section-header";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "../projects/project-card";
import { ArrowRight, ExternalLink } from "lucide-react";

export function FeaturedProjects() {
  const featuredProjects = projectsData.filter((project) => project.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            title="Featured Projects"
            description="A selection of my recent work in cloud architecture and full-stack development"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16"
        >
          {/* Featured project showcase - alternating layout */}
          <div className="space-y-32">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 0 ? "md:grid-flow-col" : "md:grid-flow-col-dense"
                }`}>
                  {/* Project Image with hover effect */}
                  <div className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="relative overflow-hidden rounded-xl shadow-2xl"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      </div>
                      
                      {/* Overlay with links on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-4">
                          {project.links.github && (
                            <Link
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                            >
                              GitHub <ExternalLink size={14} />
                            </Link>
                          )}
                          {project.links.live && (
                            <Link
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-card text-card-foreground border border-border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-accent transition-colors"
                            >
                              Live Demo <ExternalLink size={14} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Tech stack badges */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 w-full max-w-[90%]">
                      <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-full px-4 py-1 flex items-center gap-2 shadow-lg">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={tech} className="text-xs font-medium text-primary whitespace-nowrap">
                            {tech}{i < Math.min(project.technologies.length, 3) - 1 && <span className="mx-1 text-muted-foreground">•</span>}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs font-medium text-muted-foreground">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project details */}
                  <div className={`space-y-4 ${index % 2 === 0 ? "md:order-first" : ""}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-primary text-sm font-medium">Featured Project</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-card border border-border/50 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="group inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Project Details
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Decorative number */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-8xl font-bold text-primary/5 select-none hidden lg:block">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center justify-center rounded-lg bg-card border border-border px-8 text-sm font-medium hover:bg-card/80 transition-all relative overflow-hidden"
          >
            <span className="relative z-10">View All Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
