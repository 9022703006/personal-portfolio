import { Component } from '@angular/core';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styles: []
})
export class EducationComponent {
  educationList: Education[] = [
    {
      degree: 'B.Tech in Computer Science (AI & Data Science)',
      institution: 'Padma Bhooshan Vasantraodada Patil Institute of Technology',
      period: '2022 — 2025',
      description: 'Specialized in AI-driven systems, Machine Learning, and Advanced Data Structures.'
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'Sanjay Bokhara Group of Institute',
      period: '2019 — 2022',
      description: 'Focused on core software engineering principles, Java programming, and web development.'
    },
    {
      degree: 'CBSE (Class X)',
      institution: 'Sanjeevan Public School',
      period: 'Completed 2019',
      description: 'Foundation in science and mathematics with a focus on analytical thinking.'
    }
  ];
}