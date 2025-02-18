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
import {GiftPageComponent} from './pages/transaction/gift-page/gift-page.component';
import {TransactionPageComponent} from './pages/transaction/transaction-page/transaction-page.component';
import {InventoryPageComponent} from './pages/user/inventory-page/inventory-page.component';
import {MarketPageComponent} from './pages/market/market-page/market-page.component';
import {TopUpPageComponent} from './pages/user/top-up-page/top-up-page.component';
import {MarketDetailPageComponent} from './pages/market/market-detail-page/market-detail-page.component';
import {PointsShopComponent} from './pages/points-shop/points-shop.component';
import {FriendPageComponent} from './pages/user/friend-page/friend-page.component';
import {DiscoveryPageComponent} from './pages/discovery-page/discovery-page.component';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:url/inventory',
    component: InventoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:url/friend',
    component: FriendPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:keyword',
    component: SearchGameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/genre/:genreKey',
    component: SearchGameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/category/:categoryKey',
    component: SearchGameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'game/:id',
    component: GameDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'discovery',
    component: DiscoveryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: GameCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: GameWishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'community',
    component: CommunityPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'community/discussion',
    component: DiscussionPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'community/discussion/:keyword',
    component: DiscussionPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'community/discussion/thread/:id',
    component: DiscussionDetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gift-checkout',
    component: GiftPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'market',
    component: MarketPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'market/:id',
    component: MarketDetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: TransactionPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'top-up',
    component: TopUpPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'points-shop',
    component: PointsShopComponent,
    canActivate: [AuthGuard],
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
