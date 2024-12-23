import { Component, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/custom-breakpoints.service';
import { SnackbarComponent } from "./Shared_Components/snackbar/snackbar.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, NavBarComponent], 
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customBreakpointsService: CustomBreakpointsService = inject(CustomBreakpointsService);


  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }




  

}


// onLogin() {
//   const toastElement = this.elementRef.nativeElement.querySelector('.toast');
//   this.toastService.showToast(toastElement);

// }
