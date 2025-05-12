import { Component, computed, effect, inject, Signal, WritableSignal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../Services/State/state.service';
import { NavbarAuthComponent } from "../navbar-auth/navbar-auth.component";
import { MovieModel } from '../../Models/movie-model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../Services/Api/api.service';
import { JsonPipe } from '@angular/common';
import { MovieNameModel } from '../../Models/movie-name-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarAuthComponent, JsonPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private readonly stateService: StateService = inject(StateService);
  private readonly apiService: ApiService = inject(ApiService);
  
  isScrollMode = this.stateService.isScrollMode;
  logoUrl = 'https:///raw.githubusercontent.com/marcinMierzwa/images-hosting/main/logo.png';

  readonly movies: Signal<MovieNameModel[]> = this.stateService.movies;
  eff = effect(()=> console.log(this.movies()))
  
  
}
