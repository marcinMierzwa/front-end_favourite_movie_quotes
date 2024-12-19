import { Routes } from '@angular/router';
import { MainMaterialComponent } from './Components/main-material/main-material.component';
import { MainBootstrapComponent } from './Components/main-bootstrap/main-bootstrap.component';

export const routes: Routes = [
    {
        path: 'material',
        component: MainMaterialComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainBootstrapComponent
    }

];
