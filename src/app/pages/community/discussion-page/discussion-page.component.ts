import {Component, OnInit} from '@angular/core';
import {GameDiscussionService} from '../../../services/community/game-discussion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../../models/game';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {GameDiscussion} from '../../../models/community/game-discussion';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.scss']
})
export class DiscussionPageComponent implements OnInit {

  profileUser: User;
  user: User;
  isUser: boolean;

  gameKeyword: string;
  games: Game[];

  searchGame: string;

  title: string;
  description: string;
  gameId: number;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private service: GameDiscussionService,
    private authService: AuthService,
  ) {
    this.profileUser = new User();
    this.user = new User();
    this.games = [];
  }

  ngOnInit(): void {
    this.isUser = false;
    this.profileUser = new User();
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      this.init();
      console.log(error);
    });
  }

  init(): void {
    this.gameKeyword = this.actRoute.snapshot.params.keyword;
    if (this.gameKeyword === undefined) {
      this.gameKeyword = '';
    }
    this.service.getGamesForDiscussion(this.gameKeyword).subscribe(async query => {
      this.games = query.data.getGamesForDiscussions;
      console.log(this.games);
    }, error => {
      console.log(error);
    });
  }

  search(): void {
    if (this.searchGame !== undefined) {
      this.router.navigate(['community/discussion/' + this.searchGame]);
    } else {
      this.router.navigate(['community/discussion']);
    }
  }

  createNewDiscussion(): void {
    this.service.insertDiscussionThread(this.title, this.description, this.gameId, this.user.id).subscribe(async query => {
      alert('Thread added!');
    }, error => {
      console.log(error);
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['community/discussion/thread/' + id]);
  }


}
