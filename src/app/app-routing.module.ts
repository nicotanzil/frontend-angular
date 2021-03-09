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
import {AdminUserViewComponent} from './pages/admin-pages/admin-user-view/admin-user-view.component';
import {AdminUserDetailComponent} from './pages/admin-pages/admin-user-detail/admin-user-detail.component';
import {SearchGameComponent} from './pages/game/search-game/search-game.component';
import {AdminGameUpdateComponent} from './pages/admin-pages/admin-game-update/admin-game-update.component';
import {SuspensionRequestComponent} from './pages/user/suspension-request/suspension-request.component';
import {GameDetailComponent} from './pages/game/game-detail/game-detail.component';
import {GameCartComponent} from './pages/game/game-cart/game-cart.component';
import {GameWishlistComponent} from './pages/game/game-wishlist/game-wishlist.component';
import {CommunityPageComponent} from './pages/community/community-page/community-page.component';
import {DiscussionPageComponent} from './pages/community/discussion-page/discussion-page.component';
import {DiscussionDetailPageComponent} from './pages/community/discussion-detail-page/discussion-detail-page.component';

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
    path: 'admin/games/update/:id',
    component: AdminGameUpdateComponent,
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
    path: 'admin/users',
    component: AdminUserViewComponent,
  },
  {
    path: 'admin/users/:id',
    component: AdminUserDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [GuestGuard],
  },
  {
    path: 'suspension-request',
    component: SuspensionRequestComponent,
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
    path: 'search/:keyword',
    component: SearchGameComponent,
  },
  {
    path: 'search/genre/:genreKey',
    component: SearchGameComponent,
  },
  {
    path: 'search/category/:categoryKey',
    component: SearchGameComponent,
  },
  {
    path: 'game/:id',
    component: GameDetailComponent,
  },
  {
    path: 'cart',
    component: GameCartComponent,
  },
  {
    path: 'wishlist',
    component: GameWishlistComponent,
  },
  {
    path: 'community',
    component: CommunityPageComponent,
  },
  {
    path: 'community/discussion',
    component: DiscussionPageComponent
  },
  {
    path: 'community/discussion/:keyword',
    component: DiscussionPageComponent
  },
  {
    path: 'community/discussion/thread/:id',
    component: DiscussionDetailPageComponent,
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
