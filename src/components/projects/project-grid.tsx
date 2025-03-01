"use client";

import { useState, useEffect } from "react";
import { Project, ProjectFilterState } from "@/types/project";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, X, Loader2, ArrowDownWideNarrow, GridIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const [filters, setFilters] = useState<ProjectFilterState>({
    category: "All",
    sortBy: "featured",
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  // Handle search debounce
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter projects based on category, search term, and sort order
  const filteredProjects = projects
    .filter((project) =>
      filters.category === "All" ? true : project.category === filters.category
    )
    .filter((project) => {
      if (!debouncedSearchTerm) return true;
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchLower)
        )
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "featured") {
        // First sort by featured status (featured first)
        if (a.featured !== b.featured) {
          return b.featured ? 1 : -1;
        }
        // Then sort alphabetically within each group
        return a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={`space-y-8 ${className || ""}`}>
      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-auto md:min-w-[320px] lg:min-w-[380px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/30 h-11 rounded-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <div className="flex md:hidden w-full justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 h-11 rounded-lg border-border/50 bg-background/50"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-5 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.category === category ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-lg h-9 transition-all",
                    filters.category === category 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-primary/10 hover:text-foreground border-border/50 bg-background/50"
                  )}
                  onClick={() => setFilters((prev) => ({ ...prev, category }))}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-px bg-border/50"></div>
              <div className="flex items-center gap-2">
                <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: "featured" | "alphabetical") =>
                    setFilters((prev) => ({ ...prev, sortBy: value }))
                  }
                >
                  <SelectTrigger className="w-[180px] h-9 text-sm bg-background/50 border-border/50 rounded-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-8 w-px bg-border/50"></div>
              
              <div className="flex items-center gap-2 bg-background/50 border border-border/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded",
                    layout === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setLayout("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded",
                    layout === "masonry" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setLayout("masonry")}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="11" x="3" y="14" rx="1" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters (Collapsible) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6 md:hidden"
            >
              <div className="space-y-5 pt-2 border-t border-border/30">
                <div className="flex flex-wrap gap-2 pt-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filters.category === category ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-lg transition-all",
                        filters.category === category 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-primary/10 hover:text-foreground border-border/50 bg-background/50"
                      )}
                      onClick={() => setFilters((prev) => ({ ...prev, category }))}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                  </div>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value: "featured" | "alphabetical") =>
                      setFilters((prev) => ({ ...prev, sortBy: value }))
                    }
                  >
                    <SelectTrigger className="w-full h-10 text-sm bg-background/50 border-border/50 rounded-lg">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured First</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">Layout:</span>
                  <div className="flex items-center gap-2 bg-background/50 border border-border/50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded",
                        layout === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                      onClick={() => setLayout("grid")}
                    >
                      <GridIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded",
                        layout === "masonry" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                      onClick={() => setLayout("masonry")}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="11" x="3" y="14" rx="1" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-2 text-sm text-muted-foreground px-1"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <span>
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {filters.category !== "All" && ` in ${filters.category}`}
          {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
        </span>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div 
          className="text-center py-20 glass rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto px-4">
            <div className="mb-4 text-primary/50">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mx-auto"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-foreground font-medium mb-2">No projects found</p>
            <p className="text-muted-foreground text-sm mb-4">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilters({ category: "All", sortBy: "featured" });
                setSearchTerm("");
              }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            layout === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
              : "columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
          )}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                layout
                className={layout === "grid" ? "h-full" : "mb-6 md:mb-8 inline-block w-full"}
              >
                <ProjectCard project={project} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
