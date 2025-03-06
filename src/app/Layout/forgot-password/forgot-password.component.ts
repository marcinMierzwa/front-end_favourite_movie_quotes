import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';
import { FormConfig } from '../../Models/form-config.interface';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormAuthComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private stateService: StateService = inject(StateService);
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
}
