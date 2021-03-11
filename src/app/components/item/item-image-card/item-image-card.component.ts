import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/item';

@Component({
  selector: 'app-item-image-card',
  templateUrl: './item-image-card.component.html',
  styleUrls: ['./item-image-card.component.scss']
})
export class ItemImageCardComponent implements OnInit {

  @Input() item: Item;

  constructor() {
    this.item = new Item();
  }

  ngOnInit(): void {
  }

}
