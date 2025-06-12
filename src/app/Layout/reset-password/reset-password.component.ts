import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormAuthComponent } from '../../Shared_Components/form-auth/form-auth.component';
import { StateService } from '../../Services/State/state.service';
import { FormConfig } from '../../Models/form-config.interface';
import { AuthService } from '../../Services/Auth/auth.service';
import { ResetPasswordFormModel } from '../../Models/form/reset-password-form.model';
import { SubmitForm } from '../../Models/form/submit-form.type';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordPayloadModel } from '../../Models/reset-password-payload-model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormAuthComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private stateService: StateService = inject(StateService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  

  isMobileMode = this.stateService.isScrollMode;
  token = signal<string>('');
  formData: FormConfig = {
    heading: 'Reset Your Password',
    submitLabel: 'Reset Password',
    groupValidation: [
      { validator: 'passwordsMatch', errorMsg: 'Passwords must be the same' },
    ],
    inputsConfig: [
      {
        id: 'password', // id is crucial for validator
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
              'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
          },
        ],
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
          {
            validator: 'passwordsMismatch',
            errorMsg: 'Passwords must be the same',
          },
        ],
      },
    ],
  };

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (token) {
      this.token.set(token);
    }
  }

  reciveForm(submitedForm: SubmitForm): void {
    const token = this.token();
    const { password, confirmPassword } =
      submitedForm as ResetPasswordFormModel;
    const payload: ResetPasswordPayloadModel = {
      token,
      password,
      confirmPassword,
    };
    this.authService.resetPassword(payload);
  }

   ngOnDestroy() {
    this.stateService.errorMessage.set(null);
  }
}
