import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterCompleteComponent } from './pages/register-complete/register-complete.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import {ViewProfileComponent} from './pages/user/view-profile/view-profile.component';
import {EditProfileComponent} from './pages/user/edit-profile/edit-profile.component';
import {AdminLoginComponent} from './pages/admin-pages/admin-login/admin-login.component';
import {AdminGameViewComponent} from './pages/admin-pages/admin-game-view/admin-game-view.component';
import {AdminGameInsertComponent} from './pages/admin-pages/admin-game-insert/admin-game-insert.component';
import {AdminPromoViewComponent} from './pages/admin-pages/admin-promo-view/admin-promo-view.component';
import {AdminPromoInsertComponent} from './pages/admin-pages/admin-promo-insert/admin-promo-insert.component';
import {AdminPromoUpdateComponent} from './pages/admin-pages/admin-promo-update/admin-promo-update.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/games',
    component: AdminGameViewComponent,
  },
  {
    path: 'admin/games/insert',
    component: AdminGameInsertComponent,
  },
  {
    path: 'admin/promos',
    component: AdminPromoViewComponent,
  },
  {
    path: 'admin/promos/insert',
    component: AdminPromoInsertComponent,
  },
  {
    path: 'admin/promos/update/:id',
    component: AdminPromoUpdateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: 'register/complete',
    component: RegisterCompleteComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'user/:url',
    component: ViewProfileComponent,
  },
  {
    path: 'user/:url/edit',
    component: EditProfileComponent,
  },
  {
    path: '**',
    component: HomeComponent,
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
