import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HeaderComponent} from './components/header/header.component';

import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {RecaptchaComponent} from './components/recaptcha/recaptcha.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterCompleteComponent} from './pages/register-complete/register-complete.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderMainComponent} from './components/header-main/header-main.component';
import {FooterComponent} from './components/footer/footer.component';
import {ViewProfileComponent} from './pages/user/view-profile/view-profile.component';
import {HomeSidebarComponent} from './pages/home/home-sidebar/home-sidebar.component';
import {EditProfileComponent} from './pages/user/edit-profile/edit-profile.component';
import {HomeContentComponent} from './pages/home/home-content/home-content.component';
import {GeneralFormComponent} from './components/user/general-form/general-form.component';
import {AvatarFormComponent} from './components/user/avatar-form/avatar-form.component';

import {environment} from '../environments/environment';
import {AdminLoginComponent} from './pages/admin-pages/admin-login/admin-login.component';
import {HeaderAdminComponent} from './pages/admin-pages/header-admin/header-admin.component';
import {AdminGameViewComponent} from './pages/admin-pages/admin-game-view/admin-game-view.component';
import {AdminGameInsertComponent} from './pages/admin-pages/admin-game-insert/admin-game-insert.component';
import {GameDeleteDialogComponent} from './components/admin/game-delete-dialog/game-delete-dialog.component';
import {AdminPromoViewComponent} from './pages/admin-pages/admin-promo-view/admin-promo-view.component';
import {AdminPromoInsertComponent} from './pages/admin-pages/admin-promo-insert/admin-promo-insert.component';
import {AdminPromoUpdateComponent} from './pages/admin-pages/admin-promo-update/admin-promo-update.component';
import {AdminUserViewComponent} from './pages/admin-pages/admin-user-view/admin-user-view.component';
import {AdminUserDetailComponent} from './pages/admin-pages/admin-user-detail/admin-user-detail.component';
import {HomeNavComponent} from './pages/home/home-nav/home-nav.component';
import {SearchGameComponent} from './pages/game/search-game/search-game.component';
import {AdminGameUpdateComponent} from './pages/admin-pages/admin-game-update/admin-game-update.component';
import {SuspensionRequestComponent} from './pages/user/suspension-request/suspension-request.component';
import {SpecialOfferGamesComponent} from './components/home/special-offer-games/special-offer-games.component';
import {HomeGameCategoryComponent} from './components/home/home-game-category/home-game-category.component';
import {NewTrendingGamesComponent} from './components/home/game-category/new-trending-games/new-trending-games.component';
import {SpecialGamesComponent} from './components/home/game-category/special-games/special-games.component';
import {GameDetailComponent} from './pages/game/game-detail/game-detail.component';
import {GameCartComponent} from './pages/game/game-cart/game-cart.component';
import {ProfileBackgroundFormComponent} from './components/user/profile-background-form/profile-background-form.component';
import {MiniProfileCardComponent} from './components/user/mini-profile-card/mini-profile-card.component';
import {MiniProfileFormComponent} from './components/user/mini-profile-form/mini-profile-form.component';
import {ThemeFormComponent} from './components/user/theme-form/theme-form.component';
import {FeaturedBadgeFormComponent} from './components/user/featured-badge-form/featured-badge-form.component';
import {GameWishlistComponent} from './pages/game/game-wishlist/game-wishlist.component';
import {AvatarFrameFormComponent} from './components/user/avatar-frame-form/avatar-frame-form.component';
import {RecentActivityComponent} from './components/user/view-profile/recent-activity/recent-activity.component';
import {CommunityPageComponent} from './pages/community/community-page/community-page.component';
import {ArtworkPageComponent} from './components/community/artwork-page/artwork-page.component';
import {ReviewsPageComponent} from './components/community/reviews-page/reviews-page.component';
import {DiscussionPageComponent} from './pages/community/discussion-page/discussion-page.component';
import {DiscussionDetailPageComponent} from './pages/community/discussion-detail-page/discussion-detail-page.component';
import {GiftPageComponent} from './pages/transaction/gift-page/gift-page.component';
import {TransactionPageComponent} from './pages/transaction/transaction-page/transaction-page.component';
import {ConfirmationFormComponent} from './components/transaction/confirmation-form/confirmation-form.component';
import {PurchaseReceiptEmailComponent} from './pages/transaction/purchase-receipt-email/purchase-receipt-email.component';
import {InventoryPageComponent} from './pages/user/inventory-page/inventory-page.component';
import {ItemImageCardComponent} from './components/item/item-image-card/item-image-card.component';
import {ItemOverviewCardComponent} from './components/item/item-overview-card/item-overview-card.component';
import {ItemTransactionGraphComponent} from './components/item/item-transaction-graph/item-transaction-graph.component';
import {ChartsModule} from 'ng2-charts';
import {TopSellerGameComponent} from './components/home/top-seller-game/top-seller-game.component';
import {TopReviewGameComponent} from './components/home/top-review-game/top-review-game.component';
import {TopSellerGamesComponent} from './components/home/game-category/top-seller-games/top-seller-games.component';
import {MarketPageComponent} from './pages/market/market-page/market-page.component';
import {TopUpPageComponent} from './pages/user/top-up-page/top-up-page.component';
import {MarketDetailPageComponent} from './pages/market/market-detail-page/market-detail-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {PointsShopComponent} from './pages/points-shop/points-shop.component';
import {PointsShopCardComponent} from './components/points-shop/points-shop-card/points-shop-card.component';
import { FriendPageComponent } from './pages/user/friend-page/friend-page.component';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http);
}

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
    DiscussionPageComponent,
    DiscussionDetailPageComponent,
    GiftPageComponent,
    TransactionPageComponent,
    ConfirmationFormComponent,
    PurchaseReceiptEmailComponent,
    InventoryPageComponent,
    ItemImageCardComponent,
    ItemOverviewCardComponent,
    ItemTransactionGraphComponent,
    TopSellerGameComponent,
    TopReviewGameComponent,
    TopSellerGamesComponent,
    MarketPageComponent,
    TopUpPageComponent,
    MarketDetailPageComponent,
    PointsShopComponent,
    PointsShopCardComponent,
    FriendPageComponent,
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
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
