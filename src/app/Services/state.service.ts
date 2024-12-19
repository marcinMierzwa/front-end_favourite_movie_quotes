import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomBreakpoints } from '../Models/custom-breakpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  screenBreakpoint: WritableSignal<CustomBreakpoints> = signal<CustomBreakpoints>(CustomBreakpoints.XXL);
  screenEff = effect(() => console.log(this.screenBreakpoint()))

}
