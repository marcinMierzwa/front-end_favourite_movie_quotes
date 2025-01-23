import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  input,
  output,
  inject,
} from '@angular/core';
import { ParentService } from '../Components/parent/parent.service';

export interface HasOverflow {
  id: number | undefined;
  hasOverflow: boolean;
}

@Directive({
  selector: '[appOverflowTruncate]',
  standalone: true,
})
export class OverflowTruncateDirective implements AfterViewInit {

  private el: ElementRef = inject(ElementRef);
  private parentService: ParentService = inject(ParentService);
  elementId = input<number>();
 


  ngAfterViewInit() {
    this.truncateText();
  }

  private truncateText() {
    const nativeElement = this.el.nativeElement;
    const hasOverflow = nativeElement.scrollHeight > nativeElement.clientHeight;
    this.parentService.setOverflowStates({
      id: this.elementId(),
      hasOverflow
    })
    
    

  }
}
