import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {GameService} from '../../../services/home/game.service';
import {Game} from '../../../models/game';
import {fromEvent} from 'rxjs';
import {debounce, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  @Input() user: User;
  @Input() isUser: boolean;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  inFocus: boolean;
  games: Game[];
  key: string;

  constructor(
    private router: Router,
    private service: GameService,
  ) {
    this.inFocus = false;
    this.games = [];
  }

  onInputFocusOut(event: any): void {
    this.inFocus = false;
  }

  onInputFocusIn(event: any): void {
    this.inFocus = true;
  }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        console.log(event.target);
        return event.target.value;
      })
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((keyword: string) => {
      console.log(keyword);
      if (keyword.length > 0) {
        this.key = keyword;
        this.service.gameSearch(keyword).subscribe(async query => {
          this.games = query.data.gameSearch;
        });
      }
    });
  }

  searchGame(): void {
    this.router.navigate(['search/' + this.key]);
  }
}
