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
import {InputGameReview} from '../../../models/community/input-game-review';
import {CommunityGameReviewService} from '../../../services/community/community-game-review.service';
import {CommunityGameReview} from '../../../models/community/community-game-review';
import {TopCountriesGame} from '../../../models/home/top-countries-game';

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

  isHaveGame: boolean;
  isInCart: boolean;
  isInWishlist: boolean;
  cartGames: Game[];
  wishlistGames: Game[];

  gameReviewInput: InputGameReview;
  mostHelpfulGameReviews: CommunityGameReview[];
  mostRecentGameReviews: CommunityGameReview[];

  topCountries: TopCountriesGame[];
  mapReady: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private gameService: GameService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private reviewService: CommunityGameReviewService,
    private router: Router,
  ) {
    this.user = new User();
    this.imagesList = [];
    this.videosList = [];
    this.game = new Game();
    this.isImageSelected = false;
    this.selectedImage = new GameImage();
    this.selectedVideo = new GameVideo();

    this.cartGames = [];
    this.wishlistGames = [];

    this.isHaveGame = false;
    this.isInCart = false;
    this.isInWishlist = false;

    this.gameReviewInput = new InputGameReview();

    this.mostHelpfulGameReviews = [];
    this.mostRecentGameReviews = [];

    this.topCountries = [];

    this.mapReady = false;
  }

  ngOnInit(): void {
    this.gameId = this.actRoute.snapshot.params.id;
    this.authService.getUserAuth().subscribe(async query => {
      console.log(query);
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
      this.getUserGames();
      this.listInit();
      this.getCartGames();
      this.getWishlistGames();
      this.getReview();
      this.getHeatMapData();
    }, error => {
      console.log(error);
    });
  }

  getHeatMapData(): void {
    this.gameService.getTopCountries(this.gameId).subscribe(async query => {
      this.topCountries = query.data.getTopCountries;
      console.log(this.topCountries);
      this.mapReady = true;
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
      this.router.navigateByUrl('/login');
    } else {
      // Add to cart
      this.cartService.insertGameToCart(this.gameId, this.user.id).subscribe(async query => {
        alert('Game added to cart!');
        this.getCartGames();
      });
    }
  }

  addToWishlist(): void {
    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else {
      this.wishlistService.insertGameToWishlist(this.gameId, this.user.id).subscribe(async query => {
        alert('Game added to your wishlist!');
        this.getWishlistGames();
      }, error => {
        console.log(error);
      });
    }
  }

  getUserGames(): void {
    this.isHaveGame = false;
    this.user.games.forEach(g => {
      // tslint:disable-next-line:triple-equals
      if (g.id == this.gameId) {
        this.isHaveGame = true;
      }
    });
  }

  getCartGames(): void {
    this.isInCart = false;
    this.cartService.getCartGamesByUserId(this.user.id).subscribe(async query => {
      // @ts-ignore
      this.cartGames = query.data.getCartGamesByUserId;
      this.cartGames.forEach(g => {
        // tslint:disable-next-line:triple-equals
        if (this.gameId == g.id) {
          this.isInCart = true;
        }
      });
    }, error => {
      console.log(error);
    });
  }

  getWishlistGames(): void {
    this.isInWishlist = false;
    this.wishlistService.getWishlistGamesByUserId(this.user.id).subscribe(async query => {
      console.log(query);
      // @ts-ignore
      this.wishlistGames = query.data.getWishlistByUserId;
      this.wishlistGames.forEach(w => {
        // tslint:disable-next-line:triple-equals
        if (this.gameId == w.id) {
          this.isInWishlist = true;
        }
      });
    }, error => {
      console.log(error);
    });
  }

  getReview(): void {
    this.reviewService.getMostHelpful(this.gameId).subscribe(async query => {
      this.mostHelpfulGameReviews = query.data.getMostUpvotedGameReviews;
    }, error => {
      console.log(error);
    });

    this.reviewService.getMostRecent(this.gameId).subscribe(async query => {
      this.mostRecentGameReviews = query.data.getMostRecentGameReviews;
    }, error => {
      console.log(error);
    });
  }

  helpful(id: number): void {
    this.reviewService.helpful(id).subscribe(async query => {
      // this.updatePostLike();
    });
  }

  notHelpful(id: number): void {
    this.reviewService.notHelpful(id).subscribe(async query => {
      // this.updatePostLike();
    });
  }

  addGameReview(): void {
    this.gameReviewInput.userId = this.user.id;
    this.gameReviewInput.gameId = this.gameId;
    this.reviewService.createGameReview(this.gameReviewInput).subscribe(async query => {
      alert('Review added!');
    }, error => {
      console.log(error);
    });
  }
}
