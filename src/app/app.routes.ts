import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: 'Home'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Sing-Up'
    },


];
