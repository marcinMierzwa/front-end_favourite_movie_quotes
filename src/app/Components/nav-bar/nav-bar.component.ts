import { Component, inject, signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../Services/State/state.service';
import { DropdownComponent } from "../../Shared_Components/dropdown/dropdown.component";
import { NavbarAuthComponent } from "../navbar-auth/navbar-auth.component";
import { DropdownModel } from '../../Shared_Components/dropdown/dropdown.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownComponent, NavbarAuthComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private readonly stateService: StateService = inject(StateService);
  
  isScrollMode = this.stateService.isScrollMode;
  logoUrl = 'https:///raw.githubusercontent.com/marcinMierzwa/images-hosting/main/logo.png';
  dropdownMenuData: DropdownModel[] = [
    {
      title: 'Movies',
      options: ['The Followship Of The Ring', 'Two Towers', 'The Return Of The King']
    },
    {
      title: 'Characters',
      options: []
    },
  ]
  
}
