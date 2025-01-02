import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // isToastVisible = signal<boolean>(false);
  screenBreakpoint: WritableSignal<CustomBreakpoints> = signal<CustomBreakpoints>(CustomBreakpoints.XXL);
  screenEff = effect(() => console.log(this.screenBreakpoint()))

}
