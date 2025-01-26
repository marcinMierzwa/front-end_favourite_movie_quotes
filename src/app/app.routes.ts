import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HomeComponent } from './Layout/home/home.component';
import { QuoteDetailComponent } from './Layout/quote-detail/quote-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
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
    {
        path: 'quote-detail',
        component: QuoteDetailComponent,
        title: 'Quote-Detail'
    },

    // add wild card page not found !!!




];
