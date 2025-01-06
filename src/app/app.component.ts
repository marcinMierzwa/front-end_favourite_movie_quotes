import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/Breakpoints/custom-breakpoints.service';
import { SnackbarComponent } from './Shared_Components/snackbar/snackbar.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NgStyle } from '@angular/common';
import { StateService } from './Services/State/state.service';
import { FooterComponent } from "./Components/footer/footer.component";
import { FooterMobileComponent } from "./Components/footer-mobile/footer-mobile.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle, SnackbarComponent, NavBarComponent, FooterComponent, FooterMobileComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private customBreakpointsService: CustomBreakpointsService = inject(
    CustomBreakpointsService
  );
   public stateService: StateService = inject(StateService);


  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }
}
