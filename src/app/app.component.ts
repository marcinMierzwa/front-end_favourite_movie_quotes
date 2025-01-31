import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/Breakpoints/custom-breakpoints.service';
import { SnackbarComponent } from './Shared_Components/snackbar/snackbar.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NgClass, NgStyle } from '@angular/common';
import { StateService } from './Services/State/state.service';
import { FooterComponent } from './Components/footer/footer.component';
import { BottomNavbarComponent } from "./Components/bottom-navbar/bottom-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgStyle,
    NgClass,
    SnackbarComponent,
    NavBarComponent,
    FooterComponent,
    BottomNavbarComponent
],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private customBreakpointsService: CustomBreakpointsService = inject(
    CustomBreakpointsService
  );

  public stateService: StateService = inject(StateService);
  
  // @ViewChild('navbarRef', { static: true }) navbarRef!: ElementRef;

  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
    this.customBreakpointsService.setModes();

  }

  ngAfterViewInit(): void {
  //   const navbarHeight = this.navbarRef.nativeElement.offsetHeight;
  //   console.log(navbarHeight);
    
  //   this.stateService.navbarHeight.set(navbarHeight); 
  }
}
