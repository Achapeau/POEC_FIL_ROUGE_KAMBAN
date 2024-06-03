import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickInside]',
  standalone: true,
})
export class ClickInsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();
  @Output()
  public clickInside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {
      this.clickInside.emit(event);
    }
  }
}
