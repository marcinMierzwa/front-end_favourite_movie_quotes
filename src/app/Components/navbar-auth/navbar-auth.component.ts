import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.scss'
})
export class NavbarAuthComponent {

    private readonly stateService: StateService = inject(StateService);
    
    isScrollMode = this.stateService.isScrollMode;
  

  getClassList(): string {
    if (this.isScrollMode()) {
      return 'nav-link text-white scroll-mode-font';
    } else {
      return 'btn btn-sm btn-secondary scroll-mode-font rounded-2 fw-medium';
    }
  }


}
