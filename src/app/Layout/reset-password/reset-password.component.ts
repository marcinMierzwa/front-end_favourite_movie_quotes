import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";
import { StateService } from '../../Services/State/state.service';
import { FormConfig } from '../../Models/form-config.interface';
import { AuthService } from '../../Services/Auth/auth.service';
import { ResetPasswordFormModel } from '../../Models/form/reset-password-form.model';
import { SubmitForm } from '../../Models/form/submit-form.type';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormAuthComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private stateService: StateService = inject(StateService);
  private readonly authService: AuthService = inject(AuthService);
  isMobileMode = this.stateService.isScrollMode;
  formData: FormConfig = {
    heading: 'Reset Your Password',
    submitLabel: 'Reset Password',
    groupValidation: [
      { validator: 'passwordsMatch', errorMsg: 'Passwords must be the same' }
    ],
    inputsConfig: [
      {
        id: 'password', // id jest kluczowe dla walidatora
        type: 'password',
        name: 'password',
        placeholder: 'password',
        ariaLabel: 'Password field',
        isShowPasswordVisible: true,
        isContentIncrypted: false,
        validation: [
          { validator: 'required', errorMsg: 'This field is required' },
          { validator: 'minLength', value: 8, errorMsg: 'Password must be at least 8 characters long' },
          { validator: 'maxLength', value: 50, errorMsg: 'Password should contain a maximum of 50 characters' },
          { 
            validator: 'pattern', 
            value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            errorMsg: 'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        ]
      },
      {
        id: 'confirmPassword', 
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'confirm password',
        ariaLabel: 'Confirm Password field',
        isShowPasswordVisible: true,
        isContentIncrypted: false,
        validation: [
          { validator: 'required', errorMsg: 'This field is required' },
          { validator: 'passwordsMismatch', errorMsg: 'Passwords must be the same' }
        ]
      },
    ]
  };

  reciveForm(submitedForm: SubmitForm): void {
    const formValue = submitedForm as ResetPasswordFormModel;
      this.authService.resetPassword(formValue);
    }

}
