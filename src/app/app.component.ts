import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/custom-breakpoints.service';
import { StateService } from './Services/state.service';
import { ToastComponent } from "./Shared_Components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customBreakpointsService: CustomBreakpointsService = inject(CustomBreakpointsService);
  stateService: StateService = inject(StateService);

  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }

  onLogin() {
    this.stateService.isToastVisible.set(true);
  }
}
