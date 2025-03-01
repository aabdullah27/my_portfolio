import { type Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { emailjsConfig } from "@/lib/config/emailjs";

export const metadata: Metadata = {
  title: "Contact | Bjorn Melin",
  description: "Get in touch with me through this contact form.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to discuss a project? I'm always open to new opportunities and collaborations.
            Fill out the form below, and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass border border-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-muted-foreground text-sm mb-3">Feel free to email me directly</p>
            <a href={`mailto:${emailjsConfig.toEmail}`} className="text-primary hover:underline text-sm">
              {emailjsConfig.toEmail}
            </a>
          </div>

          <div className="glass border border-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Location</h3>
            <p className="text-muted-foreground text-sm mb-3">Based in</p>
            <span className="text-sm">Salt Lake City, Utah</span>
          </div>

          <div className="glass border border-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Availability</h3>
            <p className="text-muted-foreground text-sm mb-3">My working hours</p>
            <span className="text-sm">Mon - Fri: 9:00 AM - 5:00 PM MST</span>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          {/* Form Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Send Me a Message</h2>
              <p className="text-muted-foreground">
                I'm interested in freelance opportunities, especially ambitious or large projects. 
                However, if you have other requests or questions, don't hesitate to use the form.
              </p>
            </div>
            
            <div className="p-6 border border-primary/10 rounded-xl bg-card/30 backdrop-blur-sm">
              <h3 className="font-medium mb-3">What happens next?</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">1</span>
                  <span className="text-sm text-muted-foreground">I'll review your message within 24-48 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">2</span>
                  <span className="text-sm text-muted-foreground">We'll schedule a call if needed to discuss details</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">3</span>
                  <span className="text-sm text-muted-foreground">We'll collaborate to achieve your goals</span>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3 glass border border-primary/10 rounded-xl p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
