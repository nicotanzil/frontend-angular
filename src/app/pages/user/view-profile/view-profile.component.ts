import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private service: UserService
  ) { }

  userUrl: string;
  user: User;
  isUser: boolean;

  ngOnInit(): void {
    this.isUser = false;
    this.user = new User();
    this.userUrl = this.actRoute.snapshot.params.url;
    this.service.getUserByUrl(this.userUrl).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.user.profileName = query.data.getUserByUrl.profileName;
        this.user.realName = query.data.getUserByUrl.realName;
        this.user.balance = query.data.getUserByUrl.balance;
        this.user.summary = query.data.getUserByUrl.summary;
        this.user.avatar = query.data.getUserByUrl.avatar;
        this.user.profileBackground = query.data.getUserByUrl.profileBackground;
        this.user.customURL = query.data.getUserByUrl.customURL;
        this.user.country = query.data.getUserByUrl.country.name;
        this.user.experience = query.data.getUserByUrl.experience;
        this.user.level = Math.floor(this.user.experience / 100);
        this.isUser = true;
      }
    }, error => {
      console.log(error);
      this.isUser = false;
    });
  }
}
