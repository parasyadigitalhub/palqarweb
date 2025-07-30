import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { AnimationComponent } from "./intro/animation/animation.component";
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "./common/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AnimationComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Parasya';

  animationDone = false;

  onAnimationDone() {
    this.animationDone = true;
  }
}
