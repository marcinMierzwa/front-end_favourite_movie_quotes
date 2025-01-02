import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarConfigInterface } from "../../Models/snackbar-success-config.interface";


@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

      private _snackBar: MatSnackBar = inject(MatSnackBar); 
    

      openSnackBar (message: string, action: string, SnackBarConfig: SnackBarConfigInterface): void {
        this._snackBar.open(message, action, {
          panelClass: SnackBarConfig.panelClass,
          horizontalPosition: SnackBarConfig.horizontalPosition,
          verticalPosition: SnackBarConfig.verticalPosition,
          duration: SnackBarConfig.duration,
        });
      }
    

    
}