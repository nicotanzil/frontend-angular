import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {ProfileBackground} from '../../models/user/profile-background';
import {AvatarFrame} from '../../models/user/avatar-frame';
import {AnimatedAvatar} from '../../models/user/animated-avatar';
import {ChatSticker} from '../../models/user/chat-sticker';
import {MiniProfileBackground} from '../../models/user/mini-profile-background';
import {forkJoin} from 'rxjs';
import {PointsShopService} from '../../services/points-shop/points-shop.service';

@Component({
  selector: 'app-points-shop',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.scss']
})
export class PointsShopComponent implements OnInit {

  isAuth: boolean;
  user: User;

  profileBackgrounds: ProfileBackground[];
  avatarFrames: AvatarFrame[];
  animatedAvatars: AnimatedAvatar[];
  chatStickers: ChatSticker[];
  miniProfileBackgrounds: MiniProfileBackground[];

  constructor(
    private authService: AuthService,
    private pointsShopService: PointsShopService,
  ) {
    this.user = new User();

    this.profileBackgrounds = [];
    this.avatarFrames = [];
    this.animatedAvatars = [];
    this.chatStickers = [];
    this.miniProfileBackgrounds = [];
  }

  ngOnInit(): void {
    this.isAuth = false;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isAuth = true;
      this.init();
    }, error => {
      this.isAuth = false;
      console.log(error);
    });
  }

  init(): void {
    forkJoin(
      this.pointsShopService.excludeProfileBackground(this.user.id),
      this.pointsShopService.excludeAvatarFrame(this.user.id),
      this.pointsShopService.excludeAnimatedAvatars(this.user.id),
      this.pointsShopService.excludeChatStickers(this.user.id),
      this.pointsShopService.excludeMiniProfileBackground(this.user.id),
    ).subscribe(async res => {
      console.log(res);
      this.profileBackgrounds = res[0].data.excludeProfileBackground;
      this.avatarFrames = res[1].data.excludeAvatarFrames;
      this.animatedAvatars = res[2].data.excludeAnimatedAvatars;
      this.chatStickers = res[3].data.excludeChatStickers;
      this.miniProfileBackgrounds = res[4].data.excludeMiniProfileBackgrounds;
    }, error => {
      console.log(error);
    });
  }

  buyProfileBackground(id: number): void {
    if (confirm('Are you sure you want to buy this item?')) {
      this.pointsShopService.buyProfileBackground(this.user.id, id).subscribe(async query => {
        // @ts-ignore
        if (query.data.buyProfileBackground) {
          alert('Purchase success!');
        }
        else {
          alert('Oops! something went wrong');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  buyAvatarFrame(id: number): void {
    if (confirm('Are you sure you want to buy this item?')) {
      this.pointsShopService.buyAvatarFrame(this.user.id, id).subscribe(async query => {
        // @ts-ignore
        if (query.data.buyAvatarFrame) {
          alert('Purchase success!');
        }
        else {
          alert('Oops! something went wrong');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  buyAnimatedAvatar(id: number): void {
    if (confirm('Are you sure you want to buy this item?')) {
      this.pointsShopService.buyAnimatedAvatar(this.user.id, id).subscribe(async query => {
        // @ts-ignore
        if (query.data.buyAnimatedAvatars) {
          alert('Purchase success!');
        }
        else {
          alert('Oops! something went wrong');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  buyChatSticker(id: number): void {
    if (confirm('Are you sure you want to buy this item?')) {
      this.pointsShopService.buyChatSticker(this.user.id, id).subscribe(async query => {
        // @ts-ignore
        if (query.data.buyChatSticker) {
          alert('Purchase success!');
        }
        else {
          alert('Oops! something went wrong');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  buyMiniProfileBackground(id: number): void {
    if (confirm('Are you sure you want to buy this item?')) {
      this.pointsShopService.buyMiniProfileBackground(this.user.id, id).subscribe(async query => {
        // @ts-ignore
        if (query.data.buyMiniProfileBackground) {
          alert('Purchase success!');
        }
        else {
          alert('Oops! something went wrong');
        }
      }, error => {
        console.log(error);
      });
    }
  }

}
