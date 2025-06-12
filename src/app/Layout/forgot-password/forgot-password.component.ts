import { Component, inject, OnDestroy } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';
import { FormConfig } from '../../Models/form-config.interface';
import { ForgotPasswordFormModel } from '../../Models/form/forgot-password-form-model';
import { AuthService } from '../../Services/Auth/auth.service';
import { SubmitForm } from '../../Models/form/submit-form.type';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormAuthComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {
  private stateService: StateService = inject(StateService);
  private readonly authService: AuthService = inject(AuthService);
  isMobileMode = this.stateService.isScrollMode;
  formData: FormConfig = {
    heading: 'Forgot Your Password?',
    submitLabel: 'Send',
    inputsConfig: [
      {
        id: 'email',
        type: 'email',
        name: 'email',
        placeholder: 'enter your email',
        ariaLabel: 'Email field',
        isShowPasswordVisible: false,
        isContentIncrypted: false,
        validation: [
          { validator: 'required', errorMsg: 'This field is required' },
          { validator: 'email', errorMsg: 'Email must be a valid email' },
          { validator: 'maxLength', value: 50, errorMsg: 'Email should contain a maximum of 50 characters' }
        ]
      },
    ]
  };

    reciveForm(submitedForm: SubmitForm): void {
      const formValue = submitedForm as ForgotPasswordFormModel;
        this.authService.forgotPassword(formValue);
      }

      ngOnDestroy() {
    this.stateService.errorMessage.set(null);
  }
  
}
