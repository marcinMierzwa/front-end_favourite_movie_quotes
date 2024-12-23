import { SnackBarConfigInterface } from "../Models/snackbar-success-config.interface";

export const SnackBarSuccessConfig:  SnackBarConfigInterface = {
    panelClass: ['success'] ,
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
    duration: 3000,} as const