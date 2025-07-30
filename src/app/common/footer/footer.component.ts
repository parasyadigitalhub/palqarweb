import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) { }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  goTo() {
    window.open('https://wa.me/919995498218', '_blank');
  }

  onButtonHover(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
  }

  resetButtonHover() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
      (btn as HTMLElement).style.transform = 'translate(0, 0)';
    });
  }

}
