import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LazyLoadDirective } from '../../common/directives/lazy-load.directive';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit {
  selectedYear: string = '2023';
  showFull2023: boolean = false;
  showFull2024: boolean = false;
  isMobile: boolean = false;

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
  }
}
