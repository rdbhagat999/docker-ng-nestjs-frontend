import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { ResetPasswordComponent } from './public/reset-password/reset-password.component';

const routes: Routes = [

  { path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'reset/:token', component: ResetPasswordComponent },
    ]
  },
  {
    path: 'main',
    canActivate: [],
    loadChildren: () => import('./secure/secure.module').then((m) => m.SecureModule),
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
