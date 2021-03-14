import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../models/current-user';
import {query} from '@angular/animations';
import {Router} from '@angular/router';
import {UpdateUser} from '../../models/user/update-user';
import {FriendRequestService} from '../../services/user/friend-request.service';
import {CheckoutService} from '../../services/transaction/checkout.service';
import {TranslateService} from '@ngx-translate/core';
import {ItemService} from '../../services/user/item.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit, OnChanges {
  @Input() isUser: boolean;
  @Input() user: User;

  friendRequestCount: number;
  giftCount: number;
  itemCount: number;

  isAccountDropdown: boolean;
  isNotificationDropdown: boolean;
  isLanguageDropdown: boolean;

  constructor(
    private service: AuthService,
    private router: Router,
    private friendRequestService: FriendRequestService,
    private checkoutService: CheckoutService,
    private itemService: ItemService,
    public translate: TranslateService,
  ) {
    this.user = new User();

    this.isAccountDropdown = false;
    this.isNotificationDropdown = false;
    this.isLanguageDropdown = false;

    translate.addLangs(['en', 'id']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|id/) ? browserLang : 'en');
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined) {
      this.initNotification();
    }
  }

  initNotification(): void {
    this.friendRequestService.getPendingFriendRequestCount(this.user.id).subscribe(async res => {
      this.friendRequestCount = res.data.getPendingFriendRequestCount;
    });

    this.checkoutService.getGiftNotificationCount(this.user.id).subscribe(async res => {
      this.giftCount = res.data.getGiftNotificationCount;
    });

    this.itemService.getNewItemNotification(this.user.id).subscribe(async res => {
      this.itemCount = res.data.getNewItemNotificationCount;
    });
  }

  logout(): void {
    console.log('Logout');
    this.service.logout().subscribe();

    this.isUser = false;
    AuthService.isLoggedIn = false;

    this.router.navigateByUrl('/login');
  }

  changeAccoutnDropdownState(): void {
    if (this.isAccountDropdown) {
      this.isAccountDropdown = false;
    } else {
      this.isAccountDropdown = true;
    }
  }

  changeNotificationDropdownState(): void {
    if (this.isNotificationDropdown) {
      this.isNotificationDropdown = false;
    } else {
      this.isNotificationDropdown = true;
    }
  }
}
