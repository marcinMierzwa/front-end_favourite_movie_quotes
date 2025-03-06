import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";
import { StateService } from '../../Services/State/state.service';
import { FormConfig } from '../../Models/form-config.interface';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormAuthComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private stateService: StateService = inject(StateService);
  isMobileMode = this.stateService.isScrollMode;
  formData: FormConfig = {
    heading: 'Reset Your Password',
    submitLabel: 'Reset Password',
    inputsConfig: [
      {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'new password',
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
            errorMsg: 'Password must contain minimum 8 charactes, at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        ]
      },
    ]
  };
}
