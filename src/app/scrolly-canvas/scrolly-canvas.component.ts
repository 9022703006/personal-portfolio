import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scrolly-canvas',
  templateUrl: './scrolly-canvas.component.html',
  styleUrls: ['./scrolly-canvas.component.css']
})
export class ScrollyCanvasComponent implements AfterViewInit {
  @ViewChild('scrollyCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private context!: CanvasRenderingContext2D | null;
  private images: HTMLImageElement[] = [];
  private totalFrames = 126; // 000 to 125
  private currentFrameIndex = 0;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
    
    if (this.context) {
      this.resizeCanvas();
      this.preloadImages();
    }
  }

  // Optimize scroll tracking outside Angular zone for performance
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.isBrowser) return;
    
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.updateFrame());
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;
    
    this.ngZone.runOutsideAngular(() => {
      this.resizeCanvas();
      this.drawFrame(this.currentFrameIndex);
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    // Important: we match the intrinsic size of our full-res images (typically 1920x1080)
    // or we can set it to the viewport size and use object-fit: cover in CSS
    // Using viewport size for sharper 1:1 rendering on high-DPI
    const dpr = window.devicePixelRatio || 1;
    // Set internal canvas resolution to window size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // We already have w-full h-full on the element via Tailwind, so we just scale the context
  }

  private preloadImages(): void {
    let imagesLoaded = 0;
    
    for (let i = 0; i < this.totalFrames; i++) {
      const img = new Image();
      // Format number to 3 digits e.g. 000, 001, 125
      const frameNum = i.toString().padStart(3, '0');
      img.src = `assets/sequence/frame_${frameNum}_delay-0.055s.png`;
      
      img.onload = () => {
        imagesLoaded++;
        // Draw the very first frame as soon as it loads to avoid white screen
        if (i === 0) {
          this.drawFrame(0);
        }
      };
      
      this.images.push(img);
    }
  }

  private updateFrame(): void {
    // Calculate scroll progress within the 500vh container
    const scrollyContainer = this.canvasRef.nativeElement.closest('.h-\\[500vh\\]') as HTMLElement;
    if (!scrollyContainer) return;

    const scrollTop = window.scrollY;
    // Offset by container top if it's not at the very top of the page (in our case it is)
    const containerTop = scrollyContainer.offsetTop; 
    const containerHeight = scrollyContainer.clientHeight;
    const windowHeight = window.innerHeight;

    // Scroll progress from 0 to 1
    // Starts when container hits top of viewport, ends when container bottom hits bottom of viewport
    let scrollFraction = (scrollTop - containerTop) / (containerHeight - windowHeight);
    
    // Clamp between 0 and 1
    scrollFraction = Math.max(0, Math.min(1, scrollFraction));

    // Map to frame index (0 to totalFrames - 1)
    const frameIndex = Math.floor(scrollFraction * (this.totalFrames - 1));

    if (this.currentFrameIndex !== frameIndex) {
      this.currentFrameIndex = frameIndex;
      this.drawFrame(frameIndex);
    }
  }

  private drawFrame(index: number): void {
    if (!this.context || !this.images[index] || !this.images[index].complete) return;

    const canvas = this.canvasRef.nativeElement;
    const img = this.images[index];
    
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Implement object-fit: cover logic mathematically onto the canvas for best performance
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image (e.g. ultra-wide display)
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2; // Center vertically
    } else {
      // Canvas is taller than image (e.g. mobile display)
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2; // Center horizontally
    }

    this.context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }
}
