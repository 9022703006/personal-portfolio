import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { name: 'Projects', target: 'projects' },
    { name: 'Education', target: 'education' },
    { name: 'Contact Us', target: 'contact' }
  ];

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}