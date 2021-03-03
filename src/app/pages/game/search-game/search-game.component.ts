import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {CurrentUser} from '../../../models/current-user';
import {Game} from '../../../models/game';
import {SearchGameService} from '../../../services/home/search-game/search-game.service';
import {ActivatedRoute} from '@angular/router';
import {InputTag} from '../../../models/input/input-tag';
import {Tag} from '../../../models/tag';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss']
})
export class SearchGameComponent implements OnInit {

  maxValue: number;

  isUser: boolean;
  user: User;

  clientHeight: number;
  scrollPos: number;
  isLoading: boolean;

  totalGame: number;
  games: Game[];
  fetchGames: Game[];
  currentPage: number;
  keyword: string;
  endOfData: boolean;

  genreKey: number;

  // Filter
  gliderValue: number;
  priceDisplay: string;
  price: number;
  tagsDisplay: Tag[];
  inputTags: InputTag[];

  hoveredGame: Game;
  rows;
  isHovering: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private gameService: SearchGameService,
  ) {
    this.user = new User();

    this.maxValue = 999999999;
    this.totalGame = 0;
    this.games = [];
    this.isLoading = true;
    this.endOfData = false;
    this.currentPage = 1;
    this.priceDisplay = 'Any Price';
    this.price = this.maxValue;
    this.tagsDisplay = [];
    this.inputTags = [];

    this.rows = [];
    this.hoveredGame = new Game();
    this.isHovering = false;
  }


  @HostListener('window:scroll', ['$event']) onScroll(event: any): void {
    this.clientHeight = event.target.scrollingElement.clientHeight;
    this.scrollPos = window.pageYOffset;
    if (this.scrollPos >= 0.5 * this.clientHeight && !this.isLoading && !this.endOfData) {
      // Load more data
      this.isLoading = true;
      this.fetchGameData();
    }
  }

  ngOnInit(): void {
    this.keyword = this.actRoute.snapshot.params.keyword;
    this.genreKey = this.actRoute.snapshot.params.genreKey;
    if (this.genreKey) {
      const inputTag = new InputTag();
      inputTag.id = this.genreKey;
      this.inputTags.push(inputTag);
      this.keyword = '';
    }
    this.authService.getUserAuth().subscribe(async (query) => {
      if (query.data.getUserAuth.accountName !== '') {
        this.user = query.data.getUserAuth;
        this.isUser = true;
        console.log(this.user);
      }
      else {
        // guest login
        this.isUser = false;
      }
    }, (error) => {
      console.log(error);
      this.isUser = false;
    });
    this.fetchGameData();
    this.currentPage++;
  }

  fetchGameData = () => {
    this.isLoading = true;
    this.gameService.getSearchGamePage(this.keyword, this.currentPage, this.price, this.inputTags).subscribe(async query => {
      this.fetchGames = query.data.gameSearchPage;
      this.hoveredGame = this.fetchGames[0];
      if (this.fetchGames.length <= 0) {
        // No more data
        this.endOfData = true;
      }
      else {
        this.totalGame += this.fetchGames.length;
        this.fetchGames.forEach(value => {
          this.games.push(value);
          value.tags.forEach(tag => {
            this.pushTag(tag);
          });
        });
        if (this.fetchGames.length <= 10) {
          this.endOfData = true;
        }
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  gliderChange = (event: any) => {
    this.gliderValue = event.target.value;
    // tslint:disable-next-line:triple-equals
    if (this.gliderValue == 0) {
      this.priceDisplay = 'Free';
      this.price = 0;
    }
    // tslint:disable-next-line:triple-equals
    else if (this.gliderValue == 11) {
      this.priceDisplay = 'Any Price';
      this.price = this.maxValue;
    }
    else {
      this.priceDisplay = 'Under ' + (this.gliderValue * 50000);
      this.price = this.gliderValue * 50000;
    }
    this.resetAttributes();
    this.fetchGameData();
  }

  onTagChange(event: any): void {
    let currTag: InputTag;
    if (event.target.checked) {
      currTag = {
        id: event.target.value
      };
      this.inputTags.push(currTag);
    }
    else {
      this.inputTags.forEach((value, index) => {
        if (value.id === event.target.value) { this.inputTags.splice(index, 1); }
      });
    }
    this.resetAttributes();
    this.fetchGameData();
  }

  resetAttributes(): void {
    this.currentPage = 1;
    this.games = [];
    this.totalGame = 0;
  }

  pushTag(tag: Tag): void {
    let x = true;
    this.tagsDisplay.forEach(value => {
      if (value.id === tag.id) {
        x = false;
      }
    });
    if (x) {
      this.tagsDisplay.push(tag);
    }
  }

  rowsInit(): void {
    this.games.forEach(game => {
      this.rows[game.id] = false;
    });
  }

  onHover(rowId): void {
    this.games.forEach(game => {
      if (game.id === rowId) {
        this.hoveredGame = game;
        this.isHovering = true;
      }
    });
  }

  clearHover(): void {
    this.isHovering = false;
  }
}
