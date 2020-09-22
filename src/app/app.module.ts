import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivityComponent } from './components/activity/activity.component';
import { DetailsComponent } from './components/details/details.component';
import { ContactComponent } from './components/contact/contact.component';

import { OwlModule } from 'ngx-owl-carousel';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import {HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

//chat module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { DashboardComponent } from './components/chat-new/dashboard/dashboard.component';
import { LoginComponent } from './components/chat-new/login/login.component';

import { SignupComponent } from './components/chat-new/signup/signup.component';

//material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field'; 


import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FilterPipeModule } from 'ngx-filter-pipe';


//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TestComponent } from './test/test.component';
import { ActivityAddComponent } from './components/activity-add/activity-add.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    ActivityComponent,
    DetailsComponent,
    ContactComponent,
    routingComponents,
    RegisterComponent,
    ProfileComponent,

    //chat-box
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    TestComponent,
    ActivityAddComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule  ,
    AngularFireModule.initializeApp(environment.firebase,'maivolunteer'),
    AngularFirestoreModule,
    AngularFireModule,
    MatFormFieldModule,

    FormsModule,
    HttpClientModule,

    //chat-box
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,MatIconModule,MatSidenavModule,MatInputModule,MatButtonModule,ScrollingModule,MatSnackBarModule,
    MatListModule, MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,AngularFirestoreModule,
    ScrollToModule.forRoot(),
    FilterPipeModule,

  ],
  providers: [ UserService, EventService, LoginService,ChatService, AuthService, AngularFireStorage, AngularFirestore, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
