import { Component, inject, input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { LoginRequestInterface } from '../../Models/login-request.interface';
import { SnackBarService } from '../../Services/snackbar.service';
import { SnackBarSuccessConfig } from '../../Utills/snackbar-config';

@Component({
  selector: 'app-form-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.css'
})
export class FormAuthComponent {
  private snackbarService: SnackBarService = inject(SnackBarService); 
  private authService: AuthService = inject(AuthService);
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  form: FormGroup = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  onSubmit() {
    const formValue: LoginRequestInterface = this.form.getRawValue();
    this.authService.login(formValue).subscribe({
      next: (response) => {
        console.log(response);
         this.snackbarService.openSnackBar(response.email, 'close', SnackBarSuccessConfig )
      },
      error: (err) => {
        console.error(err);
        this.snackbarService.openSnackBar('error', 'close', SnackBarSuccessConfig)
            }
    });
    
    
    // const config = new MatSnackBarConfig();
    // config.duration = 3000;  // Czas trwania SnackBar
    // config.horizontalPosition = 'center'; // Pozycja pozioma
    // config.verticalPosition = 'bottom';      // Pozycja pionowa
    // config.panelClass = ["my-snackbar"];  // Klasa CSS
    // this.snackBar.open('message', 'Close', config);
  }


}
