import { BreakpointObserver } from "@angular/cdk/layout";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { CustomBreakpoints } from "../Models/custom-breakpoint.enum";

@Injectable({
    providedIn: 'root'
})

export class CustomBreakpointsService {
     private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
     breakPoint$ = this.breakpointObserver.observe(CustomBreakpoints.XL).pipe(
        map(result => result.matches)
      );

    //   getCurrentBreakpoint() {
    //     this.breakPoint$.subscribe(breakpoint => {
    //         console.log(breakpoint);
            
    //     })
    //   }

    getCurrentBreakpoint(): Observable<string> {
        return this.breakpointObserver
          .observe(Object.values(CustomBreakpoints))
          .pipe(
            map(state => {
              for (const [key, query] of Object.entries(CustomBreakpoints)) {
                if (state.breakpoints[query]) {
                  return key; // Zwróć nazwę aktualnego breakpointa
                }
              }
              return 'Unknown'; // Jeśli żaden nie pasuje
            })
          );
      }
}