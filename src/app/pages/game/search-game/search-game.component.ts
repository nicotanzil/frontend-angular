import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {CurrentUser} from '../../../models/current-user';
import {Game} from '../../../models/game';
import {SearchGameService} from '../../../services/home/search-game/search-game.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss']
})
export class SearchGameComponent implements OnInit {

  isUser: boolean;
  user: User;
  test = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1];

  clientHeight: number;
  scrollPos: number;
  isLoading: boolean;

  totalGame: number;
  games: Game[];
  fetchGames: Game[];
  currentPage: number;
  keyword: string;
  endOfData: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private gameService: SearchGameService,
  ) {
    this.totalGame = 0;
    this.games = [];
    this.isLoading = false;
    this.endOfData = false;
    this.currentPage = 1;
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
    this.authService.getUserAuth().subscribe(async (query) => {
      if (query.data.getUserAuth.accountName !== '') {
        // logged in user
        console.log(query.data);
        CurrentUser.id = query.data.getUserAuth.id;
        CurrentUser.accountName = query.data.getUserAuth.accountName;
        CurrentUser.profileName = query.data.getUserAuth.profileName;
        CurrentUser.realName = query.data.getUserAuth.realName;
        CurrentUser.email = query.data.getUserAuth.email;
        CurrentUser.balance = query.data.getUserAuth.balance;
        CurrentUser.customUrl = query.data.getUserAuth.customURL;
        CurrentUser.avatar = query.data.getUserAuth.avatar;
        CurrentUser.profileBackground = query.data.getUserAuth.profileBackground;

        this.user = CurrentUser;
        this.isUser = true;
      }
      else {
        // guest login
        this.isUser = false;
      }
    }, (error) => {
      this.isUser = false;
    });
    this.fetchGameData();
    this.currentPage++;
  }

  fetchGameData = () => {
    this.gameService.getSearchGamePage(this.keyword, this.currentPage).subscribe(async query => {
      this.fetchGames = query.data.gameSearchPage;
      if (this.fetchGames.length <= 0) {
        // No more data
        this.endOfData = true;
      }
      else {
        this.totalGame += this.fetchGames.length;
        this.fetchGames.forEach(value => {
          this.games.push(value);
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
}
