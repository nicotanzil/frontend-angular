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
import { AdminPromoUpdateComponent } from './pages/admin-pages/admin-promo-update/admin-promo-update.component';
import { AdminUserViewComponent } from './pages/admin-pages/admin-user-view/admin-user-view.component';
import { AdminUserDetailComponent } from './pages/admin-pages/admin-user-detail/admin-user-detail.component';
import { HomeNavComponent } from './pages/home/home-nav/home-nav.component';
import { SearchGameComponent } from './pages/game/search-game/search-game.component';
import { AdminGameUpdateComponent } from './pages/admin-pages/admin-game-update/admin-game-update.component';
import { SuspensionRequestComponent } from './pages/user/suspension-request/suspension-request.component';
import { SpecialOfferGamesComponent } from './components/home/special-offer-games/special-offer-games.component';
import { HomeGameCategoryComponent } from './components/home/home-game-category/home-game-category.component';
import { NewTrendingGamesComponent } from './components/home/game-category/new-trending-games/new-trending-games.component';
import { SpecialGamesComponent } from './components/home/game-category/special-games/special-games.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCartComponent } from './pages/game/game-cart/game-cart.component';
import { ProfileBackgroundFormComponent } from './components/user/profile-background-form/profile-background-form.component';
import { MiniProfileCardComponent } from './components/user/mini-profile-card/mini-profile-card.component';
import { MiniProfileFormComponent } from './components/user/mini-profile-form/mini-profile-form.component';
import { ThemeFormComponent } from './components/user/theme-form/theme-form.component';
import { FeaturedBadgeFormComponent } from './components/user/featured-badge-form/featured-badge-form.component';
import { GameWishlistComponent } from './pages/game/game-wishlist/game-wishlist.component';
import { AvatarFrameFormComponent } from './components/user/avatar-frame-form/avatar-frame-form.component';
import { RecentActivityComponent } from './components/user/view-profile/recent-activity/recent-activity.component';
import { CommunityPageComponent } from './pages/community/community-page/community-page.component';
import { ArtworkPageComponent } from './components/community/artwork-page/artwork-page.component';
import { ReviewsPageComponent } from './components/community/reviews-page/reviews-page.component';


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
    AdminPromoUpdateComponent,
    AdminUserViewComponent,
    AdminUserDetailComponent,
    HomeNavComponent,
    SearchGameComponent,
    AdminGameUpdateComponent,
    SuspensionRequestComponent,
    SpecialOfferGamesComponent,
    HomeGameCategoryComponent,
    NewTrendingGamesComponent,
    SpecialGamesComponent,
    GameDetailComponent,
    GameCartComponent,
    ProfileBackgroundFormComponent,
    MiniProfileCardComponent,
    MiniProfileFormComponent,
    ThemeFormComponent,
    FeaturedBadgeFormComponent,
    GameWishlistComponent,
    AvatarFrameFormComponent,
    RecentActivityComponent,
    CommunityPageComponent,
    ArtworkPageComponent,
    ReviewsPageComponent,
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
