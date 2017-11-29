import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//routes
import {APP_ROUTING} from './app.routes';
//formularios
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/inside/navbar/navbar.component';
import { ProfileComponent } from './components/inside/profile/profile.component';
import { InsideComponent } from './components/inside/inside.component';
import { MainComponent } from './components/inside/main/main.component';
import { TestComponent } from './components/inside/test/test.component';
import { LikesComponent } from './components/inside/test/likes/likes.component';
import { VisionComponent } from './components/inside/test/vision/vision.component';
import { PersonalityComponent } from './components/inside/test/personality/personality.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    InsideComponent,
    MainComponent,
    TestComponent,
    LikesComponent,
    VisionComponent,
    PersonalityComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
