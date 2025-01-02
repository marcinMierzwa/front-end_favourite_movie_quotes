import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/Breakpoints/custom-breakpoints.service';
import { SnackbarComponent } from './Shared_Components/snackbar/snackbar.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, NavBarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  customBreakpointsService: CustomBreakpointsService = inject(
    CustomBreakpointsService
  );

  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }
}
