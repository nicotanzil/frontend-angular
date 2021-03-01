import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {Genre} from '../../../models/genre';
import {Tag} from '../../../models/tag';
import {Promo} from '../../../models/promo';
import {Developer} from '../../../models/developer';
import {Publisher} from '../../../models/publisher';
import {System} from '../../../models/system';
import {DefaultAssets} from '../../../models/default-assets';
import {InputGameImage} from '../../../models/input/input-game-image';
import {InputGameVideo} from '../../../models/input/input-game-video';
import {AdminGamesService} from '../../../services/admin/admin-games.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {InputGame} from '../../../models/input/input-game';
import {InputGenre} from '../../../models/input/input-genre';
import {InputTag} from '../../../models/input/input-tag';
import {InputDeveloper} from '../../../models/input/input-developer';
import {finalize} from 'rxjs/operators';
import {async} from 'rxjs';

@Component({
  selector: 'app-admin-game-update',
  templateUrl: './admin-game-update.component.html',
  styleUrls: ['./admin-game-update.component.scss']
})
export class AdminGameUpdateComponent implements OnInit {

  genres: Genre[];
  tags: Tag[];
  promos: Promo[];
  developers: Developer[];
  publishers: Publisher[];
  systems: System[];

  gameId: number;
  game: Game;

  bannerTemp: any;
  bannerPreview: string = DefaultAssets.imageLink;

  imageUploads: InputGameImage[];
  updateImageUploads: InputGameImage[];
  updateImageIndex: number[];
  imageTemp: any[];
  imageId: number[];
  imagePreview: any[];
  imageIndex: number;

  videoUploads: InputGameVideo[];
  updateVideoUploads: InputGameVideo[];
  updateVideoIndex: number[];
  videoTemp: any[];
  videoId: number[];
  videoPreview: any[];
  videoIndex: number;

  updateGame: InputGame;

  genreCheck: boolean[];
  tagCheck: boolean[];
  developerCheck: boolean[];

  isImagesUploaded: boolean;
  isVideosUploaded: boolean;
  isBannerUploaded: boolean;
  isUploading: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private service: AdminGamesService,
    private storage: AngularFireStorage,
  ) {
    this.game = new Game();

    this.isImagesUploaded = false;
    this.isVideosUploaded = false;
    this.isBannerUploaded = false;
    this.isUploading = false;

    this.imageIndex = 1;
    this.imagePreview = [DefaultAssets.imageLink];
    this.imageTemp = [];
    this.imageId = [];
    this.imageUploads = [];
    this.updateImageUploads = [];
    this.updateImageIndex = [];

    this.videoIndex = 1;
    this.videoPreview = [DefaultAssets.videoLink];
    this.videoTemp = [];
    this.videoId = [];
    this.videoUploads = [];
    this.updateVideoUploads = [];
    this.updateVideoIndex = [];

    this.genreCheck = [false];
    this.tagCheck = [false];
    this.developerCheck = [false];

    this.updateGame = new InputGame();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  init(): void {
    // Load all genres
    this.service.getAllGenres().subscribe(async query => {
      if (query.data) {
        this.genres = query.data.genres;
        let idx = 0;
        this.genres.forEach(value => {
          this.genreCheck[idx] = false;
          idx++;
        });
        this.game.genres.forEach(genre => {
          this.genreCheck[genre.id - 1] = true;
        });
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all tags
    this.service.getAllTags().subscribe(async query => {
      if (query.data) {
        this.tags = query.data.tags;
        let idx = 0;
        this.tags.forEach(value => {
          this.tagCheck[idx] = false;
          idx++;
        });
        this.game.tags.forEach(tag => {
          this.tagCheck[tag.id - 1] = true;
        });
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all promos
    this.service.getAllPromos().subscribe(async query => {
      this.promos = query.data.promos;
    });

    // Load all developers
    this.service.getAllDevelopers().subscribe(async query => {
      if (query.data) {
        this.developers = query.data.developers;
        let idx = 0;
        this.developers.forEach(value => {
          this.developerCheck[idx] = false;
          idx++;
        });
        this.game.developers.forEach(developer => {
          this.developerCheck[developer.id - 1] = true;
        });
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all publishers
    this.service.getAllPublishers().subscribe(async query => {
      if (query.data) {
        this.publishers = query.data.publishers;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    this.service.getAllSystems().subscribe(async query => {
      if (query.data) {
        this.systems = query.data.systems;
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  ngOnInit(): void {

    this.gameId = this.actRoute.snapshot.params.id;
    // Get games by id
    this.service.getGameById(this.gameId).subscribe(async query => {
      console.log(query);
      this.game = query.data.gameById;
      this.updateGame.name = this.game.name;
      this.updateGame.description = this.game.description;
      let idx = 0;
      this.game.genres.forEach(genre => {
        this.updateGame.genres[idx] = new InputGenre();
        this.updateGame.genres[idx].id = genre.id;
        idx++;
      });
      idx = 0;
      this.game.tags.forEach(tag => {
        this.updateGame.tags[idx] = new InputTag();
        this.updateGame.tags[idx].id = tag.id;
        idx++;
      });
      this.updateGame.originalPrice = this.game.originalPrice;
      idx = 0;
      this.game.developers.forEach(developer => {
        this.updateGame.developers[idx] = new InputTag();
        this.updateGame.developers[idx].id = developer.id;
        idx++;
      });
      this.updateGame.publisherId = this.game.publisher.id;
      this.updateGame.systemId = this.game.system.id;
      this.bannerPreview = this.game.banner;
      this.imageIndex = this.game.images.length;
      this.imageIndex++;
      this.videoIndex = this.game.video.length;
      this.videoIndex++;

      idx = 0;
      this.game.images.forEach(image => {
        this.imagePreview[idx] = image.link;
        this.imageId[idx] = image.id;
        idx++;
      });
      this.imagePreview[idx] = DefaultAssets.imageLink;

      idx = 0;
      this.game.video.forEach(video => {
        this.videoPreview[idx] = video.link;
        this.videoId[idx] = video.id;
        idx++;
      });

      this.init();
    }, error => {
      console.log(error);
    });
  }

  onGenreChange(e): void {
    // On change add element to array
    let currGenre: InputGenre;
    if (e.target.checked) {
      currGenre = {
        id: Number(e.target.value),
      };
      this.updateGame.genres.push(currGenre);
    } else {
      this.updateGame.genres.forEach((value, index) => {
        if (value.id === Number(e.target.value)) {
          this.updateGame.genres.splice(index, 1);
        }
      });
    }
  }

  onTagChange(e): void {
    let currTag: InputTag;
    if (e.target.checked) {
      currTag = {
        id: Number(e.target.value),
      };
      this.updateGame.tags.push(currTag);
    } else {
      this.updateGame.tags.forEach((value, index) => {
        if (value.id === Number(e.target.value)) {
          this.updateGame.tags.splice(index, 1);
        }
      });
    }
  }

  onDeveloperChange(e): void {
    let currDeveloper: InputDeveloper;
    if (e.target.checked) {
      currDeveloper = {
        id: Number(e.target.value),
      };
      this.updateGame.developers.push(currDeveloper);
    } else {
      this.updateGame.developers.forEach((value, index) => {
        if (value.id === Number(e.target.value)) {
          this.updateGame.developers.splice(index, 1);
        }
      });
    }
  }

  uploadBannerFirebase = () => {
    const path = `assets/games/${this.gameId}/banner`;
    const ref = this.storage.ref(path);
    this.storage.upload(path, this.bannerTemp).snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.service.insertGameBanner(this.gameId, url).subscribe(async query => {
            console.log(query);
            this.isBannerUploaded = true;
            // this.alertUser();
          }, error => {
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  uploadImagesFirebase = () => {
    // Update existing images
    if (this.imageTemp.length === 0) {
      return;
    }
    this.imageTemp.forEach((image, index) => {
      const path = `assets/games/${this.gameId}/${index + 1}`;
      const ref = this.storage.ref(path);
      this.storage.upload(path, image).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            if (index >= this.game.images.length) {
              // Insert new game
              const inputGameImage = new InputGameImage();
              inputGameImage.gameId = this.gameId;
              inputGameImage.link = url;
              this.imageUploads.push(inputGameImage);
              this.insertGameImages();
            } else {
              // Update existing game
              const updateGameImage = new InputGameImage();
              updateGameImage.gameId = this.gameId;
              updateGameImage.link = url;
              this.updateImageIndex.push(this.imageId[index]);
              this.updateImageUploads.push(updateGameImage);
              this.updateGameImages();
            }
          });
        })
      ).subscribe();
    });
  }

  uploadVideosFirebase = () => {
    if (this.videoTemp.length === 0) {
      return;
    }
    console.log(this.videoTemp);
    this.videoTemp.forEach((video, index) => {
      const path = `assets/games/${this.gameId}/videos/${index + 1}`;
      const ref = this.storage.ref(path);
      this.storage.upload(path, video).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            if (index >= this.game.video.length) {
              // Insert new video
              const inputGameVideo = new InputGameVideo();
              inputGameVideo.gameId = this.gameId;
              inputGameVideo.link = url;
              this.videoUploads.push(inputGameVideo);
              this.insertGameVideos();
            } else {
              const updateGameVideo = new InputGameVideo();
              updateGameVideo.gameId = this.gameId;
              updateGameVideo.link = url;
              this.updateVideoIndex.push(this.videoId[index]);
              this.updateVideoUploads.push(updateGameVideo);
              this.updateGameVideos();
            }
          });
        })
      ).subscribe();
    });
  }

  uploadBanner = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.bannerPreview = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.bannerTemp = event.target.files[0];
    }
  }

  uploadImages = (event: any, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview[index] = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.imageTemp[index] = event.target.files[0];
      if (index + 1 >= this.imageIndex) {
        this.imageIndex++;
        this.imagePreview[index + 1] = DefaultAssets.imageLink;
      }
    }
  }

  uploadVideos = (event: any, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.videoPreview[index] = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.videoTemp[index] = event.target.files[0];
      if (index + 1 >= this.videoIndex) {
        this.videoIndex++;
        this.videoPreview[index + 1] = DefaultAssets.videoLink;
      }
    }
  }

  onSave(): void {
    console.log(this.updateGame);
    this.service.updateGame(this.gameId, this.updateGame).subscribe(async query => {
      console.log(query);
      this.isUploading = true;
      this.uploadImagesFirebase();
      this.uploadVideosFirebase();
    }, error => {
      console.log(error);
    });
  }

  insertGameImages = () => {
    console.log(this.imageUploads);
    this.service.insertGameImage(this.imageUploads).subscribe(async res => {
      this.isImagesUploaded = true;
      // this.alertUser();
    }, error => {
      console.log(error);
    });
  }

  updateGameImages = () => {
    this.service.updateGameImage(this.updateImageIndex, this.updateImageUploads).subscribe(async res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  insertGameVideos = () => {
    this.service.insertGameVideo(this.videoUploads).subscribe(async res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  updateGameVideos = () => {
    console.log(this.updateVideoIndex);
    console.log(this.updateVideoUploads);
    this.service.updateGameVideo(this.updateVideoIndex, this.updateVideoUploads).subscribe(async res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
