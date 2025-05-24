import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/Breakpoints/custom-breakpoints.service';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { StateService } from './Services/State/state.service';
import { FooterComponent } from './Components/footer/footer.component';
import { BottomNavbarComponent } from "./Components/bottom-navbar/bottom-navbar.component";
import { NotificationService } from './Services/Toastr/notification.service';
import { InitService } from './Services/Init/init.service';
import { ApiService } from './Services/Api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
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
  private stateService: StateService = inject(StateService);
  private initService: InitService = inject(InitService);
  isScrollMode = this.stateService.isScrollMode;

  private notificationService: NotificationService = inject(NotificationService);
  

  ngOnInit(): void {
    this.initService.initAppData();
    this.customBreakpointsService.setScrollMode();
  }



}
