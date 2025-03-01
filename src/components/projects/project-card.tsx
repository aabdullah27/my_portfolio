"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { TechBadge } from "@/components/shared/tech-badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={cn(
        "group glass rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        {/* Background Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 glass rounded-full px-2 py-0.5 text-[10px] font-medium text-primary">
            Featured
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] font-medium">
          {project.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3 relative">
        {/* Title and Description */}
        <div>
          <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <TechBadge key={tech} name={tech} size="xs" />
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] text-muted-foreground flex items-center px-1.5">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-2 pt-1">
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View GitHub repository"
            >
              <Github className="h-4 w-4" />
            </Link>
          )}
          
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
          
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="group/button px-0 hover:bg-transparent h-auto py-0"
              asChild
            >
              <Link href={`/projects/${project.id}`}>
                <span className="text-xs font-medium group-hover/button:text-primary transition-colors">
                  Details
                </span>
                <ArrowUpRight className="ml-0.5 h-3 w-3 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 group-hover/button:text-primary" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
}
