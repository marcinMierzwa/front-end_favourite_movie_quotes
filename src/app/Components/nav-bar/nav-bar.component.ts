import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private snackBar: MatSnackBar = inject(MatSnackBar);


  onLogin() {
    const config = new MatSnackBarConfig();
    // config.duration = 3000;  // Czas trwania SnackBar
    config.horizontalPosition = 'center'; // Pozycja pozioma
    config.verticalPosition = 'bottom';      // Pozycja pionowa
    // config.panelClass = ["my-snackbar"];  // Klasa CSS
    this.snackBar.open('message', 'Close', config);
  }

}
