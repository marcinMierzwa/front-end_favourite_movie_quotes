import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { inject, Injectable } from "@angular/core";
import { map} from 'rxjs';
import { CustomBreakpoints } from "../../Models/custom-breakpoint.enum";
import { StateService } from "../State/state.service";

@Injectable({
    providedIn: 'root'
})

export class CustomBreakpointsService {

     private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
     private stateService: StateService = inject(StateService);


    getCurrentBreakpoint():void {
        this.breakpointObserver
          .observe(Object.values(CustomBreakpoints))
          .pipe(
            map(state => {
              for (const [key, query] of Object.entries(CustomBreakpoints)) {
                if (state.breakpoints[query]) {
                  const breakpoint = key as CustomBreakpoints; 
                  this.stateService.screenBreakpoint.set(breakpoint);   
                  this.setScrollMode() 
                }
              }
              return 'Unknown'; 
            })
          ).subscribe();
      }

      setScrollMode():void {
        const breakpoints = {
          xs: CustomBreakpoints.XS,
          sm: CustomBreakpoints.SM,
        };
        this.breakpointObserver
        .observe([breakpoints.xs, breakpoints.sm])
        .pipe(
          map((state: BreakpointState) => {
            return state.matches;
          })
        ).subscribe(isActive => {
          this.stateService.isScrollMode.set(isActive);
        });
    }  

}