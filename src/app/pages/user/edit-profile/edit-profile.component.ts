import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userUrl: string;
  user: User;
  isUser: boolean;

  updateId: string;
  buttons = {
    generalBtn: true,
    avatarBtn: false,
    backgroundBtn: false,
    miniBtn: false,
    themeBtn: false,
    badgeBtn: false};

  constructor(
    private actRoute: ActivatedRoute,
    private service: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isUser = false;
    this.user = new User();
    this.userUrl = this.actRoute.snapshot.params.url;
    this.service.getUserByUrl(this.userUrl).subscribe(async query => {
      if (query.data) {
        console.log(query.data);
        this.user.profileName = query.data.getUserByUrl.profileName;
        this.user.realName = query.data.getUserByUrl.realName;
        this.user.balance = query.data.getUserByUrl.balance;
        this.user.summary = query.data.getUserByUrl.summary;
        this.user.avatar = query.data.getUserByUrl.avatar;
        this.user.profileBackground = query.data.getUserByUrl.profileBackground;
        this.user.customUrl = query.data.getUserByUrl.customURL;
        this.user.summary = query.data.getUserByUrl.summary;
        this.user.country = query.data.getUserByUrl.country.id;
        this.isUser = true;
      }
    }, error => {
      console.log(error);
      this.isUser = false;
    });
  }

  onClick(buttonId): void {
    Object.keys(this.buttons).forEach(key => {
      if (key === buttonId) {
        this.buttons[key] = true;
      }
      else {
        this.buttons[key] = false;
      }
    });
  }
}
