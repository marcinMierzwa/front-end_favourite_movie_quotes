import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/Breakpoints/custom-breakpoints.service';
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
    NavBarComponent,
    FooterComponent,
    BottomNavbarComponent
],

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
    this.customBreakpointsService.setModes();
  }

}
