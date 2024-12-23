import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormAuthComponent } from "../../Shared_Components/form-auth/form-auth.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormAuthComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
