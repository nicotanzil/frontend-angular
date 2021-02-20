import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterCompleteComponent } from './pages/register-complete/register-complete.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewProfileComponent } from './pages/user/view-profile/view-profile.component';
import { HomeSidebarComponent } from './pages/home/home-sidebar/home-sidebar.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { HomeContentComponent } from './pages/home/home-content/home-content.component';
import { GeneralFormComponent } from './components/user/general-form/general-form.component';
import { AvatarFormComponent } from './components/user/avatar-form/avatar-form.component';

import { environment } from '../environments/environment';
import { AdminLoginComponent } from './pages/admin-pages/admin-login/admin-login.component';
import { HeaderAdminComponent } from './pages/admin-pages/header-admin/header-admin.component';
import { AdminGameViewComponent } from './pages/admin-pages/admin-game-view/admin-game-view.component';
import { AdminGameInsertComponent } from './pages/admin-pages/admin-game-insert/admin-game-insert.component';
import { GameDeleteDialogComponent } from './components/admin/game-delete-dialog/game-delete-dialog.component';
import { AdminPromoViewComponent } from './pages/admin-pages/admin-promo-view/admin-promo-view.component';
import { AdminPromoInsertComponent } from './pages/admin-pages/admin-promo-insert/admin-promo-insert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RecaptchaComponent,
    RegisterCompleteComponent,
    HomeComponent,
    HeaderMainComponent,
    FooterComponent,
    ViewProfileComponent,
    HomeSidebarComponent,
    EditProfileComponent,
    HomeContentComponent,
    GeneralFormComponent,
    AvatarFormComponent,
    AdminLoginComponent,
    HeaderAdminComponent,
    AdminGameViewComponent,
    AdminGameInsertComponent,
    GameDeleteDialogComponent,
    AdminPromoViewComponent,
    AdminPromoInsertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
