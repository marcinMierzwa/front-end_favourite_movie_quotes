import { Component, inject, Signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../Services/State/state.service';
import { NavbarAuthComponent } from "../navbar-auth/navbar-auth.component";
import { MovieNameModel } from '../../Models/movie-name-model';
import { CharacterNameModel } from '../../Models/character-name-model.';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarAuthComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private readonly stateService: StateService = inject(StateService);
  private readonly authService: AuthService = inject(AuthService);
  
  isScrollMode = this.stateService.isScrollMode;
  logoUrl = 'https:///raw.githubusercontent.com/marcinMierzwa/images-hosting/main/logo.png';

  readonly moviesNames: Signal<MovieNameModel[]> = this.stateService.movieNames;
  readonly characterNames: Signal<CharacterNameModel[]> = this.stateService.characterNames
  
  onLogotClick(): void {
    this.authService.logout();
  }
}
