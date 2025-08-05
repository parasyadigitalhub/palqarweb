import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../common/header/header.component";

@Component({
  selector: 'app-header-home',
  imports: [HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderHomeComponent {
  isMenuOpen = false;
  isScrolled = false;

  constructor(private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 30;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigate(url: string) {
    this.router.navigate([url])
    this.isMenuOpen = false;
  }
}
