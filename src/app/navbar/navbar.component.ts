import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isMenuOpen = false;
  activeSection = 'home';
  isScrolled = false;


  navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'Education', target: 'education' },
    { name: 'Experience', target: 'experience' },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact Us', target: 'contact' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Scroll spy to highlight active section
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'education', 'experience', 'projects', 'contact'];
    const scrollPosition = window.pageYOffset + 100;
    this.isScrolled = window.scrollY > 50;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offset && scrollPosition < offset + height) {
          this.activeSection = section;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    this.isMenuOpen = false; // Close mobile menu on click
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}