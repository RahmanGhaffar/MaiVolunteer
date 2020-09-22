import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { ActivityAddComponent } from './components/activity-add/activity-add.component';

//chatbot
import { LoginComponent } from './components/chat-new/login/login.component';
import { DashboardComponent } from './components/chat-new/dashboard/dashboard.component';
import { SignupComponent } from './components/chat-new/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'activity', component: ActivityComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'activity/:id', component:DetailsComponent},
  { path: 'addActivity', component: ActivityAddComponent },
  

  //chat-box
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatFormFieldModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,ActivityComponent,ContactComponent, ]
