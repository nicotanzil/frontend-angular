import {Component, Input, OnInit} from '@angular/core';
import {TagService} from '../../../services/home/tag.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit {

  @Input() isUser: boolean;

  tags;
  constructor(
    private service: TagService,
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.service.getAllTags().subscribe(async (query) => {
      if (query.data) {
        this.tags = query.data.tags;
      }
    });
  }

}
