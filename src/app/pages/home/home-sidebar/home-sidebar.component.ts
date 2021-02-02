import {Component, Input, OnInit} from '@angular/core';
import {GenreService} from '../../../services/home/genre.service';
import {query} from '@angular/animations';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit {

  @Input() isUser: boolean;

  genres;
  constructor(
    private service: GenreService,
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.service.getAllGenres().subscribe(async (query) => {
      if (query.data) {
        this.genres = query.data.genres;
      }
    });
  }

}
