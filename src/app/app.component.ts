import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/custom-breakpoints.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentBreakpoint!: string;
  customBreakpointsService: CustomBreakpointsService = inject(CustomBreakpointsService);


  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }
}
