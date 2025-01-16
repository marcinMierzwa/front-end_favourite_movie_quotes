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
import { FooterMobileComponent } from './Components/footer-mobile/footer-mobile.component';
import { SearchbarComponent } from './Components/searchbar/searchbar.component';
import { FilterComponent } from './Components/filter/filter.component';
import { HeaderComponent } from './Components/header/header.component';

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
    FooterMobileComponent,
    SearchbarComponent,
    FilterComponent,
    HeaderComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private customBreakpointsService: CustomBreakpointsService = inject(
    CustomBreakpointsService
  );
  public stateService: StateService = inject(StateService);
  
  @ViewChild('headerRef', { static: true }) headerRef!: ElementRef;

  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }

  ngAfterViewInit(): void {
    const headerHeight = this.headerRef.nativeElement.offsetHeight;
    this.stateService.headerMobileHeight.set(headerHeight); 
  }
}
