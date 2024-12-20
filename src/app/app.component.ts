import { Component, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomBreakpointsService } from './Services/custom-breakpoints.service';
import { ToastComponent } from "./Shared_Components/toast/toast.component";
import { ToastService } from './Services/toast.service';
import { SnackbarComponent } from "./Shared_Components/snackbar/snackbar.component";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastComponent, SnackbarComponent], 
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customBreakpointsService: CustomBreakpointsService = inject(CustomBreakpointsService);
  private toastService: ToastService = inject(ToastService);
  private elementRef: ElementRef = inject(ElementRef);
  private _snackBar = inject(MatSnackBar); 

  durationInSeconds = 5;

  ngOnInit() {
    this.customBreakpointsService.getCurrentBreakpoint();
  }


  openSnackBar() {
    this._snackBar.open('login succesfull', 'Close', {
      panelClass: ['success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
      // duration: this.durationInSeconds * 1000,
    });
  }


  

}


// onLogin() {
//   const toastElement = this.elementRef.nativeElement.querySelector('.toast');
//   this.toastService.showToast(toastElement);

// }
