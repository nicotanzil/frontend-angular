import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/item';

@Component({
  selector: 'app-item-overview-card',
  templateUrl: './item-overview-card.component.html',
  styleUrls: ['./item-overview-card.component.scss']
})
export class ItemOverviewCardComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
