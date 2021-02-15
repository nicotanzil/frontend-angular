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
import {finalize} from 'rxjs/operators';

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

  ngOnInit(): void {
    this.newGame = new InputGame();
    // Load all genres
    this.service.getLatestId().subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        console.log(query.data);
        this.index = query.data;
        this.index++;
      }
    }, error => {
      console.log(error);
    });

    this.service.getAllGenres().subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.genres = query.data.genres;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all tags
    this.service.getAllTags().subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.tags = query.data.tags;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all developers
    this.service.getAllDevelopers().subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.developers = query.data.developers;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    // Load all publishers
    this.service.getAllPublishers().subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.publishers = query.data.publishers;
      }
    }, error => {
      console.log('Error: ' + error);
    });

    this.service.getAllSystems().subscribe(async query => {
      console.log(query.data);
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
      console.log(e.target.value + ' checked');
      currGenre = {
        id: e.target.value,
      };
      this.newGame.genres.push(currGenre);
    }
    else {
      console.log(e.target.value + ' unchecked');
      this.newGame.genres.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.genres.splice(index, 1); }
      });
    }
    console.log(this.newGame.genres);
  }

  onTagChange(e): void {
    let currTag: InputTag;
    if (e.target.checked) {
      console.log(e.target.value + ' checked');
      currTag = {
        id: e.target.value
      };
      this.newGame.tags.push(currTag);
    }
    else {
      console.log(e.target.value + ' unchecked');
      this.newGame.tags.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.tags.splice(index, 1); }
      });
    }
    console.log(this.newGame.tags);
  }

  onDeveloperChange(e): void {
    let currDeveloper: InputDeveloper;
    if (e.target.checked) {
      console.log(e.target.value + ' checked');
      currDeveloper = {
        id: e.target.value
      };
      this.newGame.developers.push(currDeveloper);
    }
    else {
      console.log(e.target.value + ' unchecked');
      this.newGame.developers.forEach((value, index) => {
        if (value.id === e.target.value) { this.newGame.developers.splice(index, 1); }
      });
    }
    console.log(this.newGame.developers);
  }

  onSaleChange(e): void {
    if (e.target.checked) { this.isDiscount = true; this.newGame.onSale = true; }
    else { this.isDiscount = false; this.newGame.onSale = false; }
  }

  onSave(): void {
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

    this.service.createGame(this.newGame).subscribe(async query => {
      console.log('success');
      console.log(query);
    }, error => {
      console.log(error);
    });
  }

  showPreview(event: any): void {
    if (event.target.id === 'banner') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.bannerImage = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.bannerSelected = event.target.files[0];
      }
      else {
        this.bannerImage = this.bannerOriginal;
        this.bannerSelected = null;
      }
    }
    else if (event.target.id === 'image1') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.image1 = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.image1Selected = event.target.files[0];
      }
      else {
        this.image1 = this.image1Original;
        this.image1Selected = null;
      }
    }
    else if (event.target.id === 'image2') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.image2 = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.image2Selected = event.target.files[0];
      }
      else {
        this.image2 = this.image2Original;
        this.image2Selected = null;
      }
    }
    else if (event.target.id === 'image3') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.image3 = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.image3Selected = event.target.files[0];
      }
      else {
        this.image3 = this.image3Original;
        this.image3Selected = null;
      }
    }
    else if (event.target.id === 'image4') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.image4 = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.image4Selected = event.target.files[0];
      }
      else {
        this.image4 = this.image4Original;
        this.image4Selected = null;
      }
    }
    else if (event.target.id === 'video') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.video = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.video = event.target.files[0];
      }
      else {
        this.video = this.videoOriginal;
        this.videoSelected = null;
      }
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
