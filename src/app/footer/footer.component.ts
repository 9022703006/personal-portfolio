import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { name: 'Education', target: 'education' },
    { name: 'Experience', target: 'experience' },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact Us', target: 'contact' }
  ];

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}