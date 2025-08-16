import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LazyLoadDirective } from '../../common/directives/lazy-load.directive';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedYear: string = '2023';
  showFull2023: boolean = false;
  showFull2024: boolean = false;
  isMobile: boolean = false;

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  private animationFrameId: number = 0;
  private scrollX: number = 0;
  private speed: number = 0.5;
  private isDragging = false;
  private startX = 0;
  private prevScrollX = 0;

  teamMembers: any[] = [
    {
      name: "Rishan",
      role: "Founder",
      image: "/individual/rishan1.webp",
      linkedin: "https://www.linkedin.com/in/rishanparasya/",
    },
    {
      name: "Arjun",
      role: "Founder & CEO",
      image: "/individual/Arjun-new.webp",
      linkedin: "https://www.linkedin.com/in/arjun-parasya-749176258/",
    },
    {
      name: "Abhay",
      role: "Chief Technical Officer",
      image: "/individual/Abhay.webp",
      linkedin: "https://www.linkedin.com/in/abhay-sunil-1553241a8/",
    },
    {
      name: "Kuriakose",
      role: "Web Interface Engineer",
      image: "/individual/kuriakose1.webp",
      linkedin: "https://www.linkedin.com/in/kuriakose-george-860872aa/",
    },
    {
      name: "Anandhu",
      role: "Data Flow Engineer",
      image: "/individual/anandhu1.webp",
      linkedin: "https://www.linkedin.com/in/ak-krx/",
    },
    {
      name: "Reema",
      role: "Dart Coder",
      image: "/individual/reema1.webp",
      linkedin: "https://www.linkedin.com/in/reema-shareen-3733ab224/",
    },
    {
      name: "Bansuri",
      role: "Social Media Mannager",
      image: "/individual/bansuri.webp",
      linkedin: "https://www.linkedin.com/in/bansuri-v-b9a66a269/",
    },
    {
      name: "Gouri",
      role: "Strategic Content Writer",
      image: "/individual/gouri.webp",
      linkedin: "https://www.linkedin.com/in/gouri-c-r-4674802b2/ ",
    },
    {
      name: "Devanand ",
      role: "Backend Developer",
      image: "/individual/devan.webp",
      linkedin: "https://www.linkedin.com/in/devanandj",
    }
  ];

  @ViewChildren('missionSection, processSection, journeySection, valuesSection, teamSection')
  scrollSections!: QueryList<ElementRef>;

  selectYear(year: string) {
    this.selectedYear = year;
  }

  ngOnInit(): void {
    this.checkScreenSize()
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.scrollSections.forEach((section) => {
      observer.observe(section.nativeElement);
    });

    this.startAutoScroll();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }

  private startAutoScroll() {
    const track = this.carouselTrack.nativeElement;

    const step = () => {
      if (!this.isDragging) {
        this.scrollX -= this.speed;

        const width = track.scrollWidth / 2;
        if (Math.abs(this.scrollX) >= width) {
          this.scrollX = 0;
        }

        track.style.transform = `translateX(${this.scrollX}px)`;
      }

      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].clientX - this.scrollX;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.scrollX = event.touches[0].clientX - this.startX;
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.scrollX}px)`;
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.scrollX;
    this.carouselTrack.nativeElement.style.cursor = 'grabbing';
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.scrollX = event.clientX - this.startX;
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.scrollX}px)`;
  }

  onMouseUp() {
    this.isDragging = false;
    this.carouselTrack.nativeElement.style.cursor = 'grab';
  }

}
