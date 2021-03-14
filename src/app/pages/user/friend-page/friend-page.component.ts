import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {AuthService} from '../../../services/auth.service';
import {FriendRequestService} from '../../../services/user/friend-request.service';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {forkJoin} from 'rxjs';
import {FriendRequest} from '../../../models/user/friend-request';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.scss']
})
export class FriendPageComponent implements OnInit {

  isAuth: boolean;
  authUser: User;
  user: User;
  userUrl: string;

  receivedRequest: FriendRequest[];
  sentRequest: FriendRequest[];

  userCode: number;
  inputCode: number;

  reportedUser: User;
  reportDescription: string;
  isReportModal: boolean;

  isSuccessModal: boolean;
  isErrorModal: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private friendRequestService: FriendRequestService,
  ) {
    this.isAuth = false;
    this.authUser = new User();
    this.user = new User();
    this.userUrl = this.actRoute.snapshot.params.url;

    this.receivedRequest = [];
    this.sentRequest = [];

    this.reportedUser = new User();

    this.isSuccessModal = false;
    this.isErrorModal = false;
  }

  ngOnInit(): void {
    this.userUrl = this.actRoute.snapshot.params.url;
    this.authService.getUserAuth().subscribe(async query => {
      this.authUser = query.data.getUserAuth;
      this.isAuth = true;
      this.init();
    }, error => {
      this.isAuth = false;
      console.log(error);
    });
  }

  init(): void {
    this.userService.getUserByUrl(this.userUrl).subscribe(async query => {
      if (query.data) {
        this.user = query.data.getUserByUrl;
        this.userCode = this.user.id + 314159;
        if (this.isAuth && this.authUser.id === this.user.id) {
          this.fetchRequestData();
        }
      }
    }, error => {
      console.log(error);
    });
  }

  fetchRequestData(): void {
    forkJoin(
      this.friendRequestService.getFriendRequestByRequestedId(this.user.id),
      this.friendRequestService.getFriendRequestByRequesterId(this.user.id)
    ).subscribe(async res => {
      this.receivedRequest = res[0].data.getFriendRequestByRequestedId;
      this.sentRequest = res[1].data.getFriendRequestByRequesterId;
    }, error => {
      console.log(error);
    });
  }

  acceptRequest(id: number): void {
    if (confirm('Are you sure you want to accept this user?')) {
      this.friendRequestService.acceptFriendRequest(id).subscribe(async query => {
        alert('User accepted!');
      }, error => {
        console.log(error);
      });
    }
  }

  declineRequest(id: number): void {
    if (confirm('Are you sure you want to decline this user?')) {
      this.friendRequestService.declineFriendRequest(id).subscribe(async query => {
        alert('User declined!');
      }, error => {
        console.log(error);
      });
    }
  }

  ignoreRequest(id: number): void {
    if (confirm('Are you sure you want to ignore this user?')) {
      this.friendRequestService.ignoreFriendRequest(id).subscribe(async query => {
        alert('User ignored!');
      }, error => {
        console.log(error);
      });
    }
  }

  createRequest(): void {
    this.friendRequestService.createFriendRequestCode(this.user.id, this.inputCode).subscribe(async query => {
      // @ts-ignore
      if (query.data.createFriendRequestCode) {
        alert('Invitation request sent!');
      } else {
        alert('Oops! something went wrong');
      }
    }, error => {
      console.log(error);
    });
  }

  openModal(reported: User): void {
    this.isReportModal = true;
    this.reportedUser = reported;
  }

  reportUser(): void {
    this.userService.reportUser(this.user.id, this.reportedUser.id, this.reportDescription).subscribe(async query => {
      this.reportDescription = '';
      this.isSuccessModal = true;
      alert('User reported!');
    }, error => {
      this.isErrorModal = true;
      console.log(error);
    });
  }

  getLevel(xp: number): number {
    return Math.floor(xp / 100);
  }

}
