import { Component, HostListener } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { map, Observable, tap } from 'rxjs';
@Component({
  selector: 'app-main-bootstrap',
  standalone: true,
  imports: [AsyncPipe, LayoutModule, NgClass],
  templateUrl: './main-bootstrap.component.html',
  styleUrl: './main-bootstrap.component.css'
})
export class MainBootstrapComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}
  CUSTOM_MOBILE_BREAKPOINT = '(max-width: 599.98px)';
  isMobile$ = this.breakpointObserver.observe(this.CUSTOM_MOBILE_BREAKPOINT).pipe(
    map(result => result.matches)
  );


  ngOnInit() {
    this.isMobile$.subscribe(isMobile => {
      console.log('Is mobile:', isMobile);
    });
  }
 }

