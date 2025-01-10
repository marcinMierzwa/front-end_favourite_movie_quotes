import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  public readonly screenBreakpoint: WritableSignal<CustomBreakpoints> = signal<CustomBreakpoints>(CustomBreakpoints.XXL);
  
  public readonly isScrollMode: WritableSignal<boolean> = signal<boolean>(false);
  
  public readonly headerMobileHeight: WritableSignal<number> = signal<number>(0);

}
