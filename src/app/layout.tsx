import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import StructuredData from "@/components/structured-data";

// Use Inter with expanded subsets for better language support
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s | Abdullah",
    default: "Abdullah - Senior Data Scientist & Cloud Solutions Architect",
  },
  description:
    "Senior Data Scientist and Cloud Solutions Architect specializing in AI/ML, GenAI innovation, cloud architecture, and modern development.",
  icons: {
    icon: '/headshot/headshot-2024.jpg',
    apple: '/headshot/headshot-2024.jpg',
  },
  openGraph: {
    type: 'website',
    title: 'Abdullah - Senior Data Scientist & Cloud Solutions Architect',
    description: 'Senior Data Scientist and Cloud Solutions Architect specializing in AI/ML, GenAI innovation, cloud architecture, and modern development.',
    images: [{
      url: '/screenshots/hero-preview.png',
      width: 1200,
      height: 630,
      alt: 'Abdullah - Portfolio Hero Section'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah - Senior Data Scientist & Cloud Solutions Architect',
    description: 'Senior Data Scientist and Cloud Solutions Architect specializing in AI/ML, GenAI innovation, cloud architecture, and modern development.',
    images: ['/screenshots/hero-preview.png']
  },
  keywords: [
    "Neuro-symbolic AI",
    "Deep Learning",
    "Reinforcement Learning",
    "Machine Learning",
    "AWS Machine Learning Engineer",
    "AWS Solutions Architect",
    "AWS SysOps Administrator",
    "AWS Developer",
    "AWS AI Practitioner",
    "Cloud Architecture",
    "MLOps",
    "Data Science",
    "Python",
    "Java",
    "TypeScript",
    "FastAPI",
    "Next.js",
    "React",
    "Neural Networks",
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "CloudFormation",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "GitHub Actions",
    "Vector Databases",
    "Statistical Modeling",
    "Clustering Algorithms",
    "PCA",
    "Feature Engineering",
    "Databricks",
    "AWS SageMaker",
    "Generative AI",
    "Large Language Models",
    "Serverless",
    "Innovation",
    "Node.js",
    "Full-Stack Development",
    "Cloud Computing",
  ],
  authors: [{ name: "Abdullah" }],
  creator: "Abdullah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <StructuredData type="both" />
      </body>
    </html>
  );
}
