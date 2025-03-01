import { 
  Brain, 
  Cloud, 
  Code, 
  BarChart 
} from "lucide-react";
import { ElementType } from "react";

export interface SkillCategory {
  name: string;
  Icon: ElementType;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & Machine Learning",
    Icon: Brain,
    color: "bg-purple-100 text-purple-600",
    skills: [
      "Generative AI",
      "AI Agents",
      "Retrieval Augmented Generation (RAG)",
      "Deep Learning",
      "Reinforcement Learning",
      "Multimodal LLMs",
      "Prompt Engineering",
      "LLM Fine-Tuning",
      "TensorFlow",
      "PyTorch",
      "Hugging Face Transformers",
    ],
  },
  {
    name: "Cloud & DevOps",
    Icon: Cloud,
    color: "bg-blue-100 text-blue-600",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Vector Databases",
      "CI/CD",
      "Git",
      "Linux",
      "MLOps",
      "Cloud Architecture",
    ],
  },
  {
    name: "Programming",
    Icon: Code,
    color: "bg-green-100 text-green-600",
    skills: [
      "Python",
      "LangChain",
      "Llama Index",
      "FastAPI",
      "Django",
      "Flask",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Microservices",
    ],
  },
  {
    name: "Data Science",
    Icon: BarChart,
    color: "bg-amber-100 text-amber-600",
    skills: [
      "Data Analysis",
      "Data Visualization",
      "Data Preprocessing",
      "Data Cleaning",
      "Data Modeling",
      "Web Scraping",
      "Automation",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
    ],
  },
];
