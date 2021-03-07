import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../models/current-user';
import {query} from '@angular/animations';
import {Router} from '@angular/router';
import {UpdateUser} from '../../models/user/update-user';
import {FriendRequestService} from '../../services/user/friend-request.service';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit, OnChanges {
  @Input() isUser: boolean;
  @Input() user: User;

  friendRequestCount: number;

  isNotificationDropdown: boolean;

  constructor(
    private service: AuthService,
    private router: Router,
    private friendRequestService: FriendRequestService,
  ) {
    this.user = new User();
    this.isNotificationDropdown = false;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined) {
      this.initNotification();
    }
  }

  initNotification(): void {
    this.friendRequestService.getPendingFriendRequestCount(this.user.id).subscribe(async query => {
      this.friendRequestCount = query.data.getPendingFriendRequestCount;
    });
  }

  logout(): void {
    console.log('Logout');
    this.service.logout().subscribe();

    this.isUser = false;
    AuthService.isLoggedIn = false;

    this.router.navigateByUrl('/login');
  }

  changeNotificationDropdownState(): void {
    if (this.isNotificationDropdown) {
      this.isNotificationDropdown = false;
    } else {
      this.isNotificationDropdown = true;
    }
  }
}
