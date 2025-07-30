import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-animation',
  imports: [],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css'
})
export class AnimationComponent implements OnInit {

  texts: string[] = [
    "Digital Solutions",
    "Brand Strategy",
    "Web Development",
    "User Experience",
    "Creative Design",
    "PARASYA"
  ];

  currentText: string = '';
  private index: number = 0;
  fadeOut: boolean = false;

  @Output() animationFinished = new EventEmitter<void>();

  ngOnInit() {
    this.showTextsSequentially();
  }

  showTextsSequentially() {
    if (this.index < this.texts.length) {
      this.currentText = this.texts[this.index];

      if (this.index === this.texts.length - 1) {
        setTimeout(() => {
          this.fadeOut = true;
          setTimeout(() => {
            this.animationFinished.emit();
          }, 400);
        }, 500);
      } else {
        this.index++;
        setTimeout(() => this.showTextsSequentially(), 300);
      }
    }
  }
}
