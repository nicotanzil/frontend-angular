import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';

import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    GraphQLModule,

    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
