import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {GameService} from '../../../services/home/game.service';
import {Game} from '../../../models/game';
import {GameImage} from '../../../models/game-image';
import {GameVideo} from '../../../models/game-video';
import {CartService} from '../../../services/transaction/cart.service';
import {async, Subject} from 'rxjs';
import {WishlistService} from '../../../services/transaction/wishlist.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  isUser: boolean;
  user: User;
  gameId: number;
  game: Game;

  selectedImage: GameImage;
  selectedVideo: GameVideo;

  imagesList;
  videosList;
  isImageSelected: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private gameService: GameService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {
    this.user = new User();
    this.imagesList = [];
    this.videosList = [];
    this.game = new Game();
    this.isImageSelected = false;
    this.selectedImage = new GameImage();
    this.selectedVideo = new GameVideo();
  }

  ngOnInit(): void {
    this.gameId = this.actRoute.snapshot.params.id;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      this.init();
    });
  }

  init(): void {
    this.gameService.getGameById(this.gameId).subscribe(async query => {
      this.game = query.data.gameById;
      this.listInit();
      console.log(this.game);
    }, error => {
      console.log(error);
    });
  }

  listInit(): void {
    if (this.game.video.length === 0) {
      // Image only
      let x = true;
      this.game.images.forEach(image => {
        if (x) {
          this.imagesList[image.id] = true;
          this.updateOverview(image.id, true);
        } else {
          this.imagesList[image.id] = false;
        }
        x = false;
      });
      this.isImageSelected = true;
      this.game.video.forEach(video => {
        this.videosList[video.id] = false;
      });
    } else {
      let x = true;
      // There are images and videos
      this.game.video.forEach(video => {
        // Process videos first
        if (x) {
          this.videosList[video.id] = true;
          this.updateOverview(video.id, false);
        } else {
          this.videosList[video.id] = false;
        }
        x = false;
      });
      this.isImageSelected = false;
      this.game.images.forEach(image => {
        this.imagesList[image.id] = false;
      });
    }
  }

  updateOverview(id: number, isImage: boolean): void {
    if (!isImage) {
      // Video selected
      this.game.video.forEach(video => {
        if (video.id === id) {
          this.selectedVideo = video;
        }
      });
    } else {
      // Image selected
      this.game.images.forEach(image => {
        if (image.id === id) {
          this.selectedImage = image;
        }
      });
    }
  }

  onClick(id, isImage: boolean): void {
    if (isImage) {
      this.isImageSelected = true;
      console.log(id);
      Object.keys(this.imagesList).forEach(key => {
        // tslint:disable-next-line:triple-equals
        if (key == id) {
          this.imagesList[key] = true;
          this.updateOverview(id, true);
        } else {
          this.imagesList[key] = false;
        }
      });
      console.log(this.imagesList);
      this.resetVideosList();
    } else {
      this.isImageSelected = false;
      Object.keys(this.videosList).forEach(key => {
        // tslint:disable-next-line:triple-equals
        if (key == id) {
          this.videosList[key] = true;
          this.updateOverview(id, false);
        } else {
          this.videosList[key] = false;
        }
      });
      this.resetImagesList();
    }
  }

  resetVideosList(): void {
    Object.keys(this.videosList).forEach(key => {
      this.videosList[key] = false;
    });
  }

  resetImagesList(): void {
    Object.keys(this.imagesList).forEach(key => {
      this.imagesList[key] = false;
    });
  }

  addToCart(): void {
    if (!this.isUser) {
      // Redirect to login page
      console.log('login');
      this.router.navigateByUrl('/login');
    } else {
      // Add to cart
      this.cartService.insertGameToCart(this.gameId, this.user.id).subscribe(async query => {
        console.log(query);
        alert('Game added to cart!');
      });
    }
  }

  addToWishlist(): void {
    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else {
      this.wishlistService.insertGameToWishlist(this.gameId, this.user.id).subscribe(async query => {
        alert('Game added to your wishlist!');
      });
    }
  }
}
