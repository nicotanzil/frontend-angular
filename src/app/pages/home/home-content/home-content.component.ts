import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  @Input() user: User;
  @Input() isUser: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
