import { BreakpointObserver } from "@angular/cdk/layout";
import { inject, Injectable } from "@angular/core";
import { map} from 'rxjs';
import { CustomBreakpoints } from "../Models/custom-breakpoint.enum";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})

export class CustomBreakpointsService {

     private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
     private stateService: StateService = inject(StateService);


    getCurrentBreakpoint() {
        this.breakpointObserver
          .observe(Object.values(CustomBreakpoints))
          .pipe(
            map(state => {
              for (const [key, query] of Object.entries(CustomBreakpoints)) {
                if (state.breakpoints[query]) {
                  const breakpoint = key as CustomBreakpoints; 
                  this.stateService.screenBreakpoint.set(breakpoint);                   
                }
              }
              return 'Unknown'; 
            })
          ).subscribe();
      }
}