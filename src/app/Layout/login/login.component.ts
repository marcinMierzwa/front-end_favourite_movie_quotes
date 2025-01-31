import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormAuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
