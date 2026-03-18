import { Component, HostListener, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  
  private isBrowser: boolean;
  private scrollProgress = 0; // 0 to 1

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      // Calculate scroll progress relative to the 500vh container
      // For simplicity, we assume the first 500vh of the page is the canvas area.
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerHeight = windowHeight * 5; 
      
      let p = scrollTop / (containerHeight - windowHeight);
      this.scrollProgress = Math.max(0, Math.min(1, p));
    });
  }

  // --- Global Overlay Opacity ---
  // Optional: fade out the whole overlay when we reach the bottom of the canvas
  overlayOpacity(): number {
    return this.scrollProgress > 0.95 ? 0 : 1;
  }

  // --- Section 1 (0% to ~20%) ---
  // Appears slightly up, settles to 0, then moves up and fades out
  section1Opacity(): number {
    if (this.scrollProgress < 0.05) return 1;
    if (this.scrollProgress < 0.20) {
      return 1 - ((this.scrollProgress - 0.05) / 0.15); // fade from 1 to 0
    }
    return 0;
  }

  section1Y(): number {
    if (this.scrollProgress === 0) return 0;
    // Parallax speed: moves up (negative Y) faster than scroll
    return -(this.scrollProgress * 400); 
  }

  // --- Section 2 (30% to ~50%) ---
  section2Opacity(): number {
    if (this.scrollProgress < 0.2) return 0;
    if (this.scrollProgress < 0.3) {
      return (this.scrollProgress - 0.2) / 0.1; // fade from 0 to 1
    }
    if (this.scrollProgress < 0.4) return 1;
    if (this.scrollProgress < 0.5) {
      return 1 - ((this.scrollProgress - 0.4) / 0.1); // fade from 1 to 0
    }
    return 0;
  }

  section2Y(): number {
    // Parallax: starts lower, moves up
    // At progress 0.3 (peak opacity), Y should be 0.
    return (0.3 - this.scrollProgress) * 500;
  }

  // --- Section 3 (60% to ~85%) ---
  section3Opacity(): number {
    if (this.scrollProgress < 0.5) return 0;
    if (this.scrollProgress < 0.6) {
      return (this.scrollProgress - 0.5) / 0.1; // fade from 0 to 1
    }
    if (this.scrollProgress < 0.75) return 1;
    if (this.scrollProgress < 0.85) {
      return 1 - ((this.scrollProgress - 0.75) / 0.1); // fade from 1 to 0
    }
    return 0;
  }

  section3Y(): number {
    // At progress 0.6 (peak opacity), Y should be 0.
    return (0.6 - this.scrollProgress) * 400;
  }
}
