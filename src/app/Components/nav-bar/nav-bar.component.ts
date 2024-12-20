import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {


  onLogin() {
    // const config = new MatSnackBarConfig();
    // // config.duration = 3000;  // Czas trwania SnackBar
    // config.horizontalPosition = 'center'; // Pozycja pozioma
    // config.verticalPosition = 'bottom';      // Pozycja pionowa
    // // config.panelClass = ["my-snackbar"];  // Klasa CSS
    // this._snackBar.open('message', 'Close', config);
  }

}
