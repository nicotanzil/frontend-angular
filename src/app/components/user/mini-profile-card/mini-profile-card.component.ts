import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';

@Component({
  selector: 'app-mini-profile-card',
  templateUrl: './mini-profile-card.component.html',
  styleUrls: ['./mini-profile-card.component.scss']
})
export class MiniProfileCardComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() selectedBackground: string;
  @Input() avatarFrame: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  floorNumber(x: number): number {
    return Math.floor(x);
  }

}
