import { Component } from '@angular/core';

export interface WorkExperience {
  role: string;
  company: string;
  location?: string;
  period: string;
  points: string[];
  skills: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experienceList: WorkExperience[] = [
    {
      role: 'AI Developer Intern',
      company: 'Kali Byte Solutions',
      period: 'August 2026 – Present',
      points: [
        'Developing AI-powered applications using Java, Spring Boot, Spring AI, REST APIs, and database technologies.',
        'Implementing Retrieval-Augmented Generation (RAG) to enable AI applications to retrieve relevant information from external knowledge sources and generate context-aware responses.',
        'Integrating MCP (Model Context Protocol) tools to enable AI applications to interact with external tools and services.',
        'Implementing Role-Based Access Control (RBAC) to provide secure, role-based access to application features and resources.',
        'Integrating AI models and intelligent features into Java-based applications using modern AI frameworks and APIs.',
        'Building backend services and AI-driven workflows to support production-oriented applications.',
        'Developing and integrating frontend modules using Angular and React while connecting them with AI-powered backend services.'
      ],
      skills: ['Java', 'Spring Boot', 'Spring AI', 'RAG', 'MCP Tools', 'RBAC', 'Angular', 'React', 'REST APIs']
    },
    {
      role: 'Java Full Stack Developer (AI Integration) Intern',
      company: 'Skill IT Academy',
      location: 'Pune',
      period: 'March 2025 – December 2025',
      points: [
        'Constructed secure RESTful APIs using Spring Boot, Spring Security, JPA, and Microservices architecture with JWT-based authentication.',
        'Integrated AI capabilities using Spring AI, OpenAI, Ollama (Local LLM), automated workflows with n8n, and voice-based AI solutions using Vapi.',
        'Built responsive frontend modules using Angular and optimized application performance and database operations.'
      ],
      skills: ['Spring Boot', 'Spring Security', 'Microservices', 'JWT', 'Spring AI', 'OpenAI', 'Ollama', 'n8n', 'Vapi', 'Angular']
    }
  ];
}
