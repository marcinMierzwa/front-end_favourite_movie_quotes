import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HomeComponent } from './Layout/home/home.component';
import { QuoteDetailComponent } from './Layout/quote-detail/quote-detail.component';
import { ForgotPasswordComponent } from './Layout/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component';
import { VerfifyEmailComponent } from './Components/verify-email/verify-email.component';

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
        path: 'quote-detail/:id',
        component: QuoteDetailComponent,
        title: 'Quote-Detail'
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot-Password'
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset-Password'
    },
    {
        path: 'verify',
        component: VerfifyEmailComponent,
        title: 'Verify'
    },




    // add wild card page not found !!!




];
