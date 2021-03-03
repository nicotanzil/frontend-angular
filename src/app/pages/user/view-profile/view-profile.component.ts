import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {FriendRequestService} from '../../../services/user/friend-request.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  url: string;
  profileUser: User;
  user: User;
  isUser: boolean;
  isFriend: boolean;
  isFriendRequestExists: boolean;
  level: number;

  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private friendRequestService: FriendRequestService,
  ) {
    this.profileUser = new User();
    this.user = new User();
    this.isUser = false;
    this.isFriend = false;
    this.isFriendRequestExists = false;
    this.user.friends = [];
  }

  ngOnInit(): void {
    this.isUser = false;
    this.profileUser = new User();
    this.url = this.actRoute.snapshot.params.url;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      console.log(this.user);
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      console.log(error);
      this.init();
    });
  }

  init(): void {
    this.userService.getUserByUrl(this.url).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.profileUser = query.data.getUserByUrl;
        console.log(this.profileUser);
        this.level = Math.floor(this.profileUser.experience / 100);
        this.validateRelationship();
        if (!this.isFriend) {
          this.friendRequestService.validateFriendRequest(this.user.id, this.profileUser.id).subscribe(async res => {
            this.isFriendRequestExists = res.data.validateFriendRequestExists;
          }, error => {
            console.log(error);
          });
        }
      }
    }, error => {
      console.log(error);
    });
  }

  validateRelationship(): void {
    if (this.user.accountName !== this.profileUser.accountName) {
      this.user.friends.forEach(friend => {
        console.log(friend);
        if (this.profileUser.accountName === friend.accountName) {
          this.isFriend = true;
        }
      });
    }
  }

  sendFriendRequest(): void {
    this.friendRequestService.createFriendRequest(this.user.id, this.profileUser.id).subscribe(async query => {
      alert('Friend request sent!');
      this.isFriendRequestExists = true;
    }, error => {
      console.log(error);
    });
  }
}
