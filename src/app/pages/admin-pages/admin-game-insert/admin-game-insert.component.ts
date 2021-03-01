import { Component, OnInit } from '@angular/core';
import {AdminGamesService} from '../../../services/admin/admin-games.service';
import {Genre} from '../../../models/genre';
import {Tag} from '../../../models/tag';
import {Developer} from '../../../models/developer';
import {Publisher} from '../../../models/publisher';
import {InputGenre} from '../../../models/input/input-genre';
import {InputTag} from '../../../models/input/input-tag';
import {InputDeveloper} from '../../../models/input/input-developer';
import {InputGame} from '../../../models/input/input-game';
import {System} from '../../../models/system';
import {DefaultAssets} from '../../../models/default-assets';
import {log} from 'util';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, mergeMap, filter} from 'rxjs/operators';
import {async, Subject} from 'rxjs';
import {InputGameImage} from '../../../models/input/input-game-image';
import {InputGameVideo} from '../../../models/input/input-game-video';

@Component({
  selector: 'app-admin-game-insert',
  templateUrl: './admin-game-insert.component.html',
  styleUrls: ['./admin-game-insert.component.scss']
})
export class AdminGameInsertComponent implements OnInit {

  isSuccess: boolean;
  isError: boolean;

  genres: Genre[];
  tags: Tag[];
  developers: Developer[];
  publishers: Publisher[];
  systems: System[];

  bannerTemp: any;
  bannerPreview: string = DefaultAssets.imageLink;

  imageUploads: InputGameImage[];
  imageTemp: any[];
  imagePreview: any[];
  imageIndex: number;

  videoUploads: InputGameVideo[];
  videoTemp: any[];
  videoPreview: any[];
  videoIndex: number;

  newGame: InputGame;
  gameId: number;

  isImagesUploaded: boolean;
  isVideosUploaded: boolean;
  isBannerUploaded: boolean;
  isUploading: boolean;

  constructor(
    private service: AdminGamesService,
    private storage: AngularFireStorage,
  ) {
    this.isImagesUploaded = false;
    this.isVideosUploaded = false;
    this.isBannerUploaded = false;
    this.isUploading = false;

    this.imageIndex = 1;
    this.imagePreview = [DefaultAssets.imageLink];
    this.imageTemp = [];
    this.imageUploads = [];

    this.videoIndex = 1;
    this.videoPreview = [DefaultAssets.videoLink];
    this.videoTemp = [];
    this.videoUploads = [];
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  ngOnInit(): void {
    this.newGame = new InputGame();
    // Load all genres
    this.service.getAllGenres().subscribe(async query => {
      if (query.data) {
        this.genres = query.data.genres;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all tags
    this.service.getAllTags().subscribe(async query => {
      if (query.data) {
        this.tags = query.data.tags;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all developers
    this.service.getAllDevelopers().subscribe(async query => {
      if (query.data) {
        this.developers = query.data.developers;
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

  onGenreChange(e): void {
    // On change add element to array
    let currGenre: InputGenre;
    if (e.target.checked) {
      currGenre = {
        id: e.target.value,
      };
      this.newGame.genres.push(currGenre);
    }
    else {
      this.newGame.genres.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.genres.splice(index, 1); }
      });
    }
  }

  onTagChange(e): void {
    let currTag: InputTag;
    if (e.target.checked) {
      currTag = {
        id: e.target.value
      };
      this.newGame.tags.push(currTag);
    }
    else {
      this.newGame.tags.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.tags.splice(index, 1); }
      });
    }
  }

  onDeveloperChange(e): void {
    let currDeveloper: InputDeveloper;
    if (e.target.checked) {
      currDeveloper = {
        id: e.target.value
      };
      this.newGame.developers.push(currDeveloper);
    }
    else {
      this.newGame.developers.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.developers.splice(index, 1); }
      });
    }
  }


  onSave(): void {
    console.log(this.newGame);
    this.service.createGame(this.newGame).subscribe(async query => {
      // @ts-ignore
      this.gameId = query.data.createGame.id;
      this.isUploading = true;
      this.uploadVideosFirebase();
      this.uploadBannerFirebase();
      this.uploadImagesFirebase();
    }, error => {
      console.log(error);
    });
  }

  uploadImagesFirebase = () => {
    if (this.imageTemp.length === 0) { return; }
    let idx = 1;
    this.imageTemp.forEach(image => {
      const path = `assets/games/${this.gameId}/${idx}`; idx++;
      const ref = this.storage.ref(path);
      this.storage.upload(path, image).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            const inputGameImage = new InputGameImage();
            inputGameImage.gameId = this.gameId;
            inputGameImage.link = url;
            this.imageUploads.push(inputGameImage);
            if (this.imageUploads.length === this.imageTemp.length) {
              this.insertGameImages();
            }
          });
        })
      ).subscribe();
    });
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
            this.alertUser();
          }, error => {
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  uploadVideosFirebase = () => {
    if (this.videoTemp.length === 0) { return; }
    let idx = 1;
    this.videoTemp.forEach(video => {
      const path = `assets/games/${this.gameId}/videos/${idx}`; idx++;
      const ref = this.storage.ref(path);
      this.storage.upload(path, video).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            const inputGameVideo = new InputGameVideo();
            inputGameVideo.gameId = this.gameId;
            inputGameVideo.link = url;
            this.videoUploads.push(inputGameVideo);
            if (this.videoUploads.length === this.videoTemp.length) {
              this.insertGameVideos();
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
      this.imageIndex++;
      this.imagePreview[index + 1] = DefaultAssets.imageLink;
    }
  }

  uploadVideos = (event: any, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.videoPreview[index] = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.videoTemp[index] = event.target.files[0];
      this.videoIndex++;
      this.videoPreview[index + 1] = DefaultAssets.videoLink;
    }
  }

  insertGameImages = () => {
    console.log(this.imageUploads);
    this.service.insertGameImage(this.imageUploads).subscribe(async res => {
      this.isImagesUploaded = true;
      this.alertUser();
    }, error => {
      console.log('There has been an error ' + error);
    });
  }

  insertGameVideos = () => {
    console.log(this.videoUploads);
    this.service.insertGameVideo(this.videoUploads).subscribe(async res => {
      this.isVideosUploaded = true;
      console.log('Video success');
      console.log(res);
      this.alertUser();
    }, error => {
      console.log('There has been an error ' + error);
    });
  }

  alertUser = () => {
    if (this.isImagesUploaded && this.isVideosUploaded && this.isBannerUploaded) {
      this.isUploading = false;
      alert('Game has been inserted!');
    }
  }
}
