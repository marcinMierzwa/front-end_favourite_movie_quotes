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

  getCurrentBreakpoint(): void {
    this.breakpointObserver
      .observe(Object.values(CustomBreakpoints))
      .pipe(
        map((state) => {
          for (const [key, query] of Object.entries(CustomBreakpoints)) {
            if (state.breakpoints[query]) {
              const breakpoint = key as CustomBreakpoints;
              this.stateService.screenBreakpoint.set(breakpoint);
            }
          }
          return 'Unknown';
        })
      )
      .subscribe();
  }

  //     setScrollMode():void {
  //       const breakpoints = {
  //         xs: '(max-width: 575.98px)',
  //         sm: '(min-width: 576px) and (max-width: 767.98px)',
  //       };
  //       this.breakpointObserver
  //       .observe([breakpoints.xs, breakpoints.sm])
  //       .pipe(
  //         map((state: BreakpointState) => {
  //           return state.matches;
  //         })
  //       ).subscribe(isActive => {
  //         this.stateService.isScrollMode.set(isActive);
  //       });
  //   }
  //   setLargeMode():void {
  //     const breakpoints = {
  //       xxl: '(min-width: 1400px)'
  //     };
  //     this.breakpointObserver
  //     .observe([breakpoints.xxl])
  //     .pipe(
  //       map((state: BreakpointState) => {
  //         return state.matches;
  //       })
  //     ).subscribe(isActive => {
  //       this.stateService.isLargeMode.set(isActive);
  //     });
  // }
  setModes(): void {
    const breakpoints = {
      xs: '(max-width: 575.98px)',
      sm: '(min-width: 576px) and (max-width: 767.98px)',
      md: '(min-width: 768px) and (max-width: 991.98px)',
      lg: '(min-width: 992px) and (max-width: 1199.98px)',
      xl: '(min-width: 1200px) and (max-width: 1399.98px)',
      xxl: '(min-width: 1400px)',
    };

    this.breakpointObserver
      .observe(Object.values(breakpoints))
      .pipe(
        map((state: BreakpointState) => {
          return {
            isScrollMode:
              state.breakpoints[breakpoints.xs] ||
              state.breakpoints[breakpoints.sm],
            isMediumMode: state.breakpoints[breakpoints.md],
            isLargeMode: state.breakpoints[breakpoints.lg],
            isXlMode: state.breakpoints[breakpoints.xl],
            isXxlMode: state.breakpoints[breakpoints.xxl],
          };
        })
      )
      .subscribe(
        ({ isScrollMode, isMediumMode, isLargeMode, isXlMode, isXxlMode }) => {
          this.stateService.isScrollMode.set(isScrollMode);
          this.stateService.isMediumMode.set(isMediumMode);
          this.stateService.isLargeMode.set(isLargeMode);
          this.stateService.isXlMode.set(isXlMode);
          this.stateService.isXxlMode.set(isXxlMode);
        }
      );
  }
}
