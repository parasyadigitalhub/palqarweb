import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit, OnDestroy {

  @Input() appLazyLoadClass = 'show';
  @Output() lazyVisible = new EventEmitter<void>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add(this.appLazyLoadClass);
          this.lazyVisible.emit();
          this.observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

}
