import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FormComponent } from './form/form.component';
import { WelcomeComponent } from './welcome/welcome.component'; // Import WelcomeComponent

export const routes: Routes = [
  { path: 'login', component: FormComponent },
  { path: '', component: FormComponent },
  { path: 'welcome', component: WelcomeComponent ,  canActivate: [AuthGuard] }, // Add welcome route
];
