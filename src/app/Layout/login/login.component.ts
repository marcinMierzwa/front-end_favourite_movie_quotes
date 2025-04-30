import { Component, inject } from '@angular/core';
import { FormAuthComponent } from '../../Shared_Components/form-auth/form-auth.component';
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';
import { FormConfig } from '../../Models/form-config.interface';
import { LogInFormInterface } from './Models/log-in-form.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../Services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormAuthComponent, RouterLink, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly stateService: StateService = inject(StateService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastrService: ToastrService = inject(ToastrService);

  readonly isMobileMode = this.stateService.isScrollMode;
  readonly isLoading = this.stateService.isLoading;

  formData: FormConfig = {
    heading: 'Log in !',
    submitLabel: 'Log in',
    inputsConfig: [
      {
        id: 'email',
        type: 'email',
        name: 'email',
        placeholder: 'email',
        ariaLabel: 'Email field',
        isShowPasswordVisible: false,
        isContentIncrypted: false,
        validation: [
          { validator: 'required', errorMsg: 'This field is required' },
          { validator: 'email', errorMsg: 'Email must be a valid email' },
          {
            validator: 'maxLength',
            value: 50,
            errorMsg: 'Email should contain a maximum of 50 characters',
          },
        ],
      },
      {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'password',
        ariaLabel: 'Password field',
        isShowPasswordVisible: true,
        isContentIncrypted: false,
        validation: [
          { validator: 'required', errorMsg: 'This field is required' },
          {
            validator: 'minLength',
            value: 8,
            errorMsg: 'Password must be at least 8 characters long',
          },
          {
            validator: 'maxLength',
            value: 50,
            errorMsg: 'Password should contain a maximum of 50 characters',
          },
          {
            validator: 'pattern',
            value:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            errorMsg:
              'Password must contain minimum 8 charactes, at least one uppercase letter, one lowercase letter, one number, and one special character',
          },
        ],
      },
    ],
  };

  reciveForm(submitedForm: LogInFormInterface): void {
    this.authService.login(submitedForm);
  }

  ngOnDestroy() {
    this.stateService.errorMessage.set(null);
    this.toastrService.clear();
  }

}
