import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {FriendRequestService} from '../../../services/user/friend-request.service';
import {SuspensionRequestService} from '../../../services/suspension-request.service';
import {SuspensionRequest} from '../../../models/suspension-request';

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
  isFriendRequestExists: boolean;
  level: number;

  isSelf: boolean;
  isFriend: boolean;
  isTotalStranger: boolean;
  isPendingStranger: boolean;

  friendContainers: boolean[];

  reportModal: boolean;

  isSuccessModal: boolean;
  isErrorModal: boolean;

  description: string;


  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private friendRequestService: FriendRequestService,
    private suspensionRequestService: SuspensionRequestService,
  ) {
    this.profileUser = new User();
    this.user = new User();
    this.isUser = false;
    this.isFriend = false;
    this.isFriendRequestExists = false;
    this.user.friends = [];

    this.friendContainers = [];

    this.isSelf = false;
    this.isFriend = false;
    this.isTotalStranger = false;
    this.isPendingStranger = false;

    this.reportModal = false;

    this.isSuccessModal = false;
    this.isErrorModal = false;

  }

  ngOnInit(): void {
    this.isUser = false;
    this.profileUser = new User();
    this.url = this.actRoute.snapshot.params.url;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      console.log(error);
    });
  }

  init(): void {
    this.userService.getUserByUrl(this.url).subscribe(async query => {
      let isFound = false;
      if (query.data) {
        this.profileUser = query.data.getUserByUrl;
        this.rowsInit();
        this.level = Math.floor(this.profileUser.experience / 100);
        if (this.user.id === this.profileUser.id) {
          this.isSelf = true; // Own account
        } else {
          this.user.friends.forEach(friend => {
            if (this.profileUser.id === friend.id && !isFound) {
              console.log('Friend');
              this.isFriend = true; // Friend
              isFound = true;
            } else {
              // Stranger
              if (!isFound) { this.validateFriendRequest(); }
            }
          });
        }
      }
    }, error => {
      console.log(error);
    });
  }

  sendFriendRequest(): void {
    this.friendRequestService.createFriendRequest(this.user.id, this.profileUser.id).subscribe(async query => {
      alert('Friend request sent!');
      this.isFriendRequestExists = true;
    }, error => {
      console.log(error);
    });
  }

  validateFriendRequest(): void {
    this.friendRequestService.validateFriendRequest(this.user.id, this.profileUser.id).subscribe(async query => {
      if (query.data.validateFriendRequestExists) {
        console.log('Pending Stranger');
        this.isPendingStranger = true;
      } else {
        console.log('Total Stranger');
        this.isTotalStranger = true;
      }
    });
  }

  floorNumber(x: number): number {
    return Math.floor(x);
  }

  rowsInit(): void {
    this.profileUser.friends.forEach(friend => {
      this.friendContainers[friend.id] = false;
    });
  }

  onHover(friendContainerId): void {
    Object.keys(this.friendContainers).forEach(key => {
      // tslint:disable-next-line:triple-equals
      if (key == friendContainerId) {
        this.friendContainers[key] = true;
      }
      else {
        this.friendContainers[key] = false;
      }
    });
  }

  clearHover(): void {
    Object.keys(this.friendContainers).forEach(key => {
      // tslint:disable-next-line:triple-equals
      this.friendContainers[key] = false;
    });
  }

  onSaveReport(): void {
    this.isErrorModal = false;
    this.isSuccessModal = false;
    this.userService.reportUser(this.user.id, this.profileUser.id, this.description).subscribe(async query => {
      this.description = '';
      this.isSuccessModal = true;
    }, error => {
      console.log(error);
      this.isErrorModal = true;
    });
  }
}
