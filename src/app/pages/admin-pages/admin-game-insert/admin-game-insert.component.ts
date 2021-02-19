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
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, mergeMap, filter} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-admin-game-insert',
  templateUrl: './admin-game-insert.component.html',
  styleUrls: ['./admin-game-insert.component.scss']
})
export class AdminGameInsertComponent implements OnInit {

  constructor(
    private service: AdminGamesService,
    private storage: AngularFireStorage,
  ) { }

  isSuccess: boolean;
  isError: boolean;

  index: number;
  genres: Genre[];
  tags: Tag[];
  developers: Developer[];
  publishers: Publisher[];
  systems: System[];
  isDiscount = false;

  bannerImage: string = DefaultAssets.imageLink;
  video: string = DefaultAssets.videoLink;
  image1: string = DefaultAssets.imageLink;
  image2: string = DefaultAssets.imageLink;
  image3: string = DefaultAssets.imageLink;
  image4: string = DefaultAssets.imageLink;

  bannerSelected: any;
  bannerOriginal: string = DefaultAssets.imageLink;

  image1Selected: any;
  image1Original: string = DefaultAssets.imageLink;

  image2Selected: any;
  image2Original: string = DefaultAssets.imageLink;

  image3Selected: any;
  image3Original: string = DefaultAssets.imageLink;

  image4Selected: any;
  image4Original: string = DefaultAssets.imageLink;

  videoSelected: any;
  videoOriginal: string = DefaultAssets.imageLink;

  newGame: InputGame;

  tasksQuery$ = new Subject();

  // const uploadImage = (path, selected) => {
  //   console.log(`Processing ${path} ${selected}`);
  //   return new Promise(resolve => {
  //     this.storage.upload()
  //   })
  // }

  ngOnInit(): void {
    this.newGame = new InputGame();
    // Load all genres
    this.service.getLatestId().subscribe(async query => {
      if (query.data) {
        this.index = query.data.getLatestId;
        this.index++;
      }
    }, error => {
      console.log(error);
    });

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

  onSaleChange(e): void {
    if (e.target.checked) { this.isDiscount = true; this.newGame.onSale = true; }
    else { this.isDiscount = false; this.newGame.onSale = false; }
  }

  onSave(): void {
    console.log(this.newGame);
    // Need validation
    const bannerPath = `assets/games/${this.index}/banner`;
    const bannerRef = this.storage.ref(bannerPath);

    const image1Path = `assets/games/${this.index}/image1`;
    const image1Ref = this.storage.ref(image1Path);

    const image2Path = `assets/games/${this.index}/image2`;
    const image2Ref = this.storage.ref(image2Path);

    const image3Path = `assets/games/${this.index}/image3`;
    const image3Ref = this.storage.ref(image3Path);

    const image4Path = `assets/games/${this.index}/image4`;
    const image4Ref = this.storage.ref(image4Path);

    // this.storage.upload(bannerPath, this.bannerSelected).snapshotChanges().pipe(
    //   finalize(() => {
    //     bannerRef.getDownloadURL().subscribe((url) => { this.newGame.banner = url; });
    //   }),
    // ).subscribe();
    //
    // this.storage.upload(image1Path, this.bannerSelected).snapshotChanges().pipe(
    //   finalize(() => {
    //     image1Ref.getDownloadURL().subscribe((url) => { this.newGame.image1 = url; });
    //   })
    // ).subscribe();

    if (this.bannerSelected !== null) {
      this.storage.upload(bannerPath, this.bannerSelected).snapshotChanges().pipe(
        finalize(() => {
          bannerRef.getDownloadURL().subscribe(url => {
            this.newGame.banner = url;
            this.newGame.video = 'video';
            this.newGame.image1 = 'image1';
            this.newGame.image2 = 'image2';
            this.newGame.image3 = 'image3';
            this.newGame.image4 = 'image4';
            console.log(this.newGame);
            this.service.createGame(this.newGame).subscribe(async query => {
              console.log('Success');
            }, error => {
              console.log('There has been an error: ', error);
            });
          });
        })
      ).subscribe();
    }

    // this.service.createGame(this.newGame).subscribe(async query => {
    //   console.log('success');
    //   console.log(query);
    // }, error => {
    //   console.log(error);
    // });
  }

  preview = (event, image, selected, original) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.bannerImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      selected = event.target.files[0];
    }
    else {
      image = original;
      selected = null;
    }
  }

  showPreview(event: any): void {
    if (event.target.id === 'banner') {
      this.preview(event, this.bannerImage, this.bannerSelected, this.bannerOriginal);
    }
    else if (event.target.id === 'image1') {
      this.preview(event, this.image1, this.image1Selected, this.image1Original);
    }
    else if (event.target.id === 'image2') {
      this.preview(event, this.image2, this.image2Selected, this.image2Original);
    }
    else if (event.target.id === 'image3') {
      this.preview(event, this.image3, this.image3Selected, this.image3Original);
    }
    else if (event.target.id === 'image4') {
      this.preview(event, this.image4, this.image4Selected, this.image4Original);
    }
    else if (event.target.id === 'video') {
      this.preview(event, this.video, this.videoSelected, this.videoOriginal);
    }
  }

  dummyData(): void {
    const gen: InputGenre = {id: 1, };
    const tag: InputTag = {id: 1};
    const dev: InputDeveloper = {id: 1};
    this.newGame.name = 'asdasd';
    this.newGame.description = 'good game';
    this.newGame.genres = [gen];
    this.newGame.tags = [tag];
    this.newGame.originalPrice = 100;
    this.newGame.onSale = true;
    this.newGame.discountPercentage = 10;
    this.newGame.developers = [dev];
    this.newGame.publisher = 1;
    this.newGame.system = 1;
    this.newGame.banner = '';
    this.newGame.video = '';
    this.newGame.banner = '';
    this.newGame.image1 = '';
    this.newGame.image2 = '';
    this.newGame.image3 = '';
    this.newGame.image4 = '';
  }
}
