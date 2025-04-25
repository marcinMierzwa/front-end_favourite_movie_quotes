import { Component, inject, OnInit } from '@angular/core';
import { FormAuthComponent } from '../../Shared_Components/form-auth/form-auth.component';
import { StateService } from '../../Services/State/state.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormConfig } from '../../Models/form-config.interface';
import { LogInFormInterface } from './Models/log-in-form.interface';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormAuthComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private stateService: StateService = inject(StateService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);

  readonly isMobileMode = this.stateService.isScrollMode;
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

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verifyEmailAddress(token);
    }
  }

  reciveForm(submitedForm: LogInFormInterface): void {
    console.log(submitedForm);
  }

}
