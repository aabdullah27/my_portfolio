"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/aabdullah27",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-abdullah-py-dev/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/abdllah._.77/",
      icon: Instagram,
    },
    {
      name: "Email",
      href: "mailto:my.abdullah.nauman@gmail.com",
      icon: Mail,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
  };

  return (
    <footer className="border-t border-border relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10 opacity-70"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10 opacity-70"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div 
          className="py-12 grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Muhammad Abdullah
                </span>
              </Link>
              <p className="mt-4 text-muted-foreground text-sm max-w-xs">
                AI Engineer and Backend Architect specializing in AI/ML solutions, RAG pipelines, and AI Agents with scalable cloud architectures.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-card border border-border hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-foreground" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                  >
                    <span className="group-hover:underline underline-offset-4">
                      {link.name}
                    </span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div 
          className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {currentYear} Muhammad Abdullah. All rights reserved.
          </p>
          
          <motion.p 
            className="flex items-center mt-2 md:mt-0"
            whileHover={{ scale: 1.03 }}
          >
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> using Next.js & Tailwind CSS
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
