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
    { name: 'Projects', target: '/projects' },
    { name: 'Education', target: '/education-info' },
    { name: 'Contact Us', target: '/person-details' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Scroll spy to highlight active section
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'projects', 'education', 'contact'];
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