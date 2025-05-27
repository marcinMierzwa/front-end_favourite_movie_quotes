import { Component, computed, inject, output, Signal } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../Models/user.model';
import { TruncateUserName } from '../../CustomPipes/truncate-userName..pipe';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [RouterLink, TruncateUserName],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.scss'
})
export class NavbarAuthComponent {

    private readonly stateService: StateService = inject(StateService);

    readonly isLoggedIn: Signal<boolean> = this.stateService.isLoggedIn;
    
    readonly isScrollMode = this.stateService.isScrollMode;

    readonly user: Signal<UserModel | null> = this.stateService.user;
      
    readonly userNameLimit = computed(() => this.isScrollMode() ? 30 : 20);

    logoutClick = output();

  getClassList(): string 
  {
    if (this.isScrollMode()) {
      return "dropdown bg-black bg-opacity-25 p-2 ps-3 rounded mt-2";
    } else {
      return "dropdown bg-black bg-opacity-25 ms-sm-1 ms-lg-2 p-2 px-sm-3 rounded scroll-mode-font text-center";
    }
  }

  logout(): void {
    this.logoutClick.emit();
  }


}
