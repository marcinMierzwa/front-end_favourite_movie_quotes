import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';
import { TooltipPosition } from '@angular/material/tooltip';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  public readonly screenBreakpoint: WritableSignal<CustomBreakpoints> = signal<CustomBreakpoints>(CustomBreakpoints.XXL);
  
  public readonly isScrollMode: WritableSignal<boolean> = signal<boolean>(false);
  
  public readonly headerMobileHeight: WritableSignal<number> = signal<number>(0);

  public readonly   positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];


}
