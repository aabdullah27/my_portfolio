"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";

export function FeaturedProjects() {
  // Filter for featured projects
  const featuredProjects = projectsData.filter(project => project.featured);
  
  return (
    <section id="featured-projects" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-2">
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing my work in AI Engineering, Backend Development, and Data Science
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-16 md:gap-24">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`grid grid-cols-1 ${
                index % 2 === 0 ? "lg:grid-cols-[1fr,1.2fr]" : "lg:grid-cols-[1.2fr,1fr]"
              } gap-8 items-center`}
            >
              {/* Project Image - Conditionally ordered based on index */}
              <div className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <motion.div 
                  className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border/50 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                </motion.div>
              </div>
              
              {/* Project Info - Conditionally ordered based on index */}
              <div className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 py-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/30">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="secondary" className="bg-secondary/30">
                        +{project.technologies.length - 5} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.links.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {project.links.live && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button asChild>
            <Link href="/projects" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
