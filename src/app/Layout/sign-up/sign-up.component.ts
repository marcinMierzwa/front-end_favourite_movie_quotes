import { Component } from '@angular/core';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormAuthComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
