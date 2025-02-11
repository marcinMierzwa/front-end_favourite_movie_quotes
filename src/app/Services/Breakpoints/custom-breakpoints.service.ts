import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';
import { StateService } from '../State/state.service';

@Injectable({
  providedIn: 'root',
})
export class CustomBreakpointsService {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private stateService: StateService = inject(StateService);

  // getCurrentBreakpoint(): void {
  //   this.breakpointObserver
  //     .observe(Object.values(CustomBreakpoints))
  //     .pipe(
  //       map((state) => {
  //         for (const [key, query] of Object.entries(CustomBreakpoints)) {
  //           if (state.breakpoints[query]) {
  //             const breakpoint = key as CustomBreakpoints;
  //             this.stateService.screenBreakpoint.set(breakpoint);
  //           }
  //         }
  //         return 'Unknown';
  //       })
  //     )
  //     .subscribe();
  // }

  setScrollMode(): void {
    const breakpoint = '(max-width: 575.98px)';
    this.breakpointObserver
      .observe(Object.values(CustomBreakpoints))
      .pipe(
        map((state: BreakpointState) => {
          return {
            isScrollMode:
              state.breakpoints[breakpoint],
          };
        })
      )
      .subscribe(
        ({ isScrollMode }) => {
          this.stateService.isScrollMode.set(isScrollMode);
        }
      );
  }
}
