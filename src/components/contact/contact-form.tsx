"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactFormData, contactFormSchema } from "@/lib/schemas/contact";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import { emailjsConfig } from "@/lib/config/emailjs";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      // Use EmailJS to send the email
      const result = await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current!,
        emailjsConfig.publicKey
      );

      if (result.text !== 'OK') {
        throw new Error("Failed to send message");
      }

      setFormStatus("success");
      toast({
        title: "Message sent!",
        description: "Thanks for your message. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus("error");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {formStatus === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div className="bg-emerald-600 p-4 flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <AlertTitle className="text-white font-semibold text-lg m-0">Message Sent Successfully!</AlertTitle>
            </div>
            <div className="bg-emerald-50 p-4 border border-emerald-200">
              <AlertDescription className="text-emerald-800 text-base font-medium">
                Thank you for your message. I&apos;ll get back to you as soon as possible.
              </AlertDescription>
            </div>
          </motion.div>
        )}

        {formStatus === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div className="bg-red-600 p-4 flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <AlertTitle className="text-white font-semibold text-lg m-0">Failed to Send Message</AlertTitle>
            </div>
            <div className="bg-red-50 p-4 border border-red-200">
              <AlertDescription className="text-red-800 text-base font-medium">
                Please try again. If the problem persists, you can email me directly
                at{" "}
                <a
                  href={`mailto:${emailjsConfig.toEmail}`}
                  className="underline font-medium text-red-700 hover:text-red-900"
                >
                  {emailjsConfig.toEmail}
                </a>
              </AlertDescription>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form 
        ref={formRef} 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6" 
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            name="name" // Required for EmailJS
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            disabled={isSubmitting}
            className={`${errors.name ? "border-red-500" : ""} focus:ring-2 focus:ring-primary/30 transition-all duration-300 focus:shadow-md focus:translate-y-[-2px]`}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                id="name-error" 
                className="text-sm text-red-500 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            name="email" // Required for EmailJS
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            className={`${errors.email ? "border-red-500" : ""} focus:ring-2 focus:ring-primary/30 transition-all duration-300 focus:shadow-md focus:translate-y-[-2px]`}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                id="email-error" 
                className="text-sm text-red-500 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message..."
            {...register("message")}
            name="message" // Required for EmailJS
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
            disabled={isSubmitting}
            rows={5}
            className={`${errors.message ? "border-red-500" : ""} focus:ring-2 focus:ring-primary/30 transition-all duration-300 focus:shadow-md focus:translate-y-[-2px]`}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p 
                id="message-error" 
                className="text-sm text-red-500 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 h-14 relative overflow-hidden group"
          >
            <motion.span 
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              initial={{ x: '-100%' }}
              animate={isSubmitting ? { x: '100%' } : {}}
              transition={{ 
                repeat: isSubmitting ? Infinity : 0, 
                duration: 1.5, 
                ease: "linear" 
              }}
            />
            
            {isSubmitting ? (
              <motion.div 
                className="flex items-center justify-center relative z-10"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="mr-3 h-6 w-6 animate-spin text-white" />
                <span className="text-lg font-semibold text-white tracking-wide">Sending...</span>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Send className="mr-3 h-6 w-6 text-white" />
                <span className="text-lg font-semibold text-white tracking-wide">Send Message</span>
              </motion.div>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
