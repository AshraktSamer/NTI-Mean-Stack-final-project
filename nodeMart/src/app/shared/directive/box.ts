import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Box]'
})
export class BoxDirective {

  constructor(private elementRef:ElementRef) { }

  @HostListener('mouseover') OnMouseHover(){
    this.elementRef.nativeElement.style.backgroundColor = "#B4B4B8"
  }
  @HostListener('mouseout')  OnMouseOut(){
    this.elementRef.nativeElement.style.backgroundColor = "#79797d"
  }
}

