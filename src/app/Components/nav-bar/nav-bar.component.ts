import { Component, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../Services/State/state.service';
import { DropdownComponent } from "../../Shared_Components/dropdown/dropdown.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private stateService: StateService = inject(StateService);
  
  isScrollMode = this.stateService.isScrollMode;
  logoUrl = 'https:///raw.githubusercontent.com/marcinMierzwa/images-hosting/main/logo.png';
  
  getClassList(): string {
    if (this.isScrollMode()) {
      return 'nav-link text-white scroll-mode-font';
    } else {
      return 'btn btn-sm btn-secondary scroll-mode-font rounded-2 fw-medium';
    }
  }
}
