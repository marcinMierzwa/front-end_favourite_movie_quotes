import { Component, inject, OnDestroy } from '@angular/core';
import { FormAuthComponent } from '../../Shared_Components/form-auth/form-auth.component';
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';
import { FormConfig } from '../../Models/form-config.interface';
import { AuthService } from '../../Services/Auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { SignUpFormModel } from '../../Models/form/signup-form-model';
import { SubmitForm } from '../../Models/form/submit-form.type';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormAuthComponent, RouterLink, MatProgressSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnDestroy {
  private stateService: StateService = inject(StateService);
  private authService: AuthService = inject(AuthService);
  private toastr: ToastrService = inject(ToastrService);

  readonly isMobileMode = this.stateService.isScrollMode;
  readonly isLoading = this.stateService.isLoading;
  formData: FormConfig = {
    heading: 'Create an Account',
    submitLabel: 'Sign Up',
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

  reciveForm(submitedForm: SubmitForm): void {
    const formValue = submitedForm as SignUpFormModel
    this.authService.createUser(formValue);
  }

  signUpGoogle() {
    this.authService.googleLogin();
  }


  ngOnDestroy() {
    this.stateService.errorMessage.set(null);
    this.toastr.clear();
  }
}
