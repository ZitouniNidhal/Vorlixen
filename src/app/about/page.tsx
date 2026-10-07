import Link from "next/link";
import { Mail, ExternalLink, Code2, Cpu, Server, Briefcase, GraduationCap, Award } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="2" />
    <circle cx="4" cy="5" r="2" />
  </svg>
);

export default function AboutPage() {
  const experiences = [
    {
      role: "Senior MLOps & AI Research Engineer",
      company: "AI & Tech Solutions",
      period: "2024 — Present",
      description: "Leading the development of end-to-end MLOps infrastructure, model compression, and scalable distributed training pipelines for LLMs and deep learning workloads.",
      highlights: [
        "Architected automated model deployment pipelines using Kubernetes, Ray, and MLflow, reducing deployment latency by 65%.",
        "Implemented 4-bit and 8-bit quantization and PEFT/LoRA fine-tuning workflows for domain-specific LLMs.",
        "Established CI/CD pipelines for continuous model validation and data drift monitoring."
      ]
    },
    {
      role: "Machine Learning Engineer",
      company: "Innovate AI Labs",
      period: "2022 — 2024",
      description: "Designed, trained, and optimized deep learning architectures for computer vision and natural language processing applications.",
      highlights: [
        "Trained high-throughput inference models deployed on cloud edge infrastructure.",
        "Built automated dataset validation and feature store integration with PyTorch and DVC.",
        "Co-authored technical papers and internal benchmarks on model efficiency."
      ]
    },
    {
      role: "AI Research Assistant",
      company: "Applied Intelligence Lab",
      period: "2021 — 2022",
      description: "Conducted research on scalable deep learning models, hyperparameter optimization, and computer vision pipelines.",
      highlights: [
        "Implemented state-of-the-art paper architectures in PyTorch.",
        "Optimized inference runtime using ONNX Runtime and TensorRT."
      ]
    }
  ];

  const skillCategories = [
    {
      title: "AI & Deep Learning",
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      skills: ["PyTorch", "TensorFlow", "Hugging Face", "Transformers", "LLM Fine-tuning (LoRA/PEFT)", "ONNX", "TensorRT", "Computer Vision", "NLP"]
    },
    {
      title: "MLOps & Cloud Infrastructure",
      icon: <Server className="w-5 h-5 text-indigo-500" />,
      skills: ["Kubernetes", "Docker", "MLflow", "Kubeflow", "Ray", "DVC", "Weights & Biases", "GCP", "AWS", "CI/CD pipelines"]
    },
    {
      title: "Software & Systems",
      icon: <Code2 className="w-5 h-5 text-indigo-500" />,
      skills: ["Python", "C++", "TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Redis", "Git", "REST APIs"]
    }
  ];

  return (
    <div className="py-10 space-y-12 max-w-3xl mx-auto">
      {/* Bio Header */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-indigo-500/20 shrink-0">
            NZ
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for Research & MLOps Collaborations
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Nidhal Zitouni</h1>
            <p className="text-lg text-muted-foreground font-medium">
              AI Research & MLOps Engineer
            </p>
          </div>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Passionate about bridging the gap between cutting-edge AI research and production-grade software engineering. 
          I specialize in building high-throughput machine learning infrastructure, model optimization, LLM fine-tuning, 
          and scalable MLOps pipelines.
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="https://github.com/ZitouniNidhal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition-all shadow-sm"
          >
            <GithubIcon />
            GitHub Profile
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="https://linkedin.com/in/zitouninidhal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition-all shadow-sm"
          >
            <LinkedinIcon />
            LinkedIn
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="mailto:nidhal.zitouni@example.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        </div>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-muted-foreground w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight">Technical Stack & Skills</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex items-center gap-2">
                {cat.icon}
                <h3 className="font-bold text-sm text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-accent text-foreground font-medium border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-tight">Education & Research Focus</h2>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
          <h3 className="text-lg font-bold">M.Sc. / B.Sc. in Computer Science & Artificial Intelligence</h3>
          <p className="text-sm text-muted-foreground">
            Specialized in Machine Learning Systems, Distributed Computing, and Neural Network Optimization.
          </p>
        </div>
      </section>
    </div>
  );
}
