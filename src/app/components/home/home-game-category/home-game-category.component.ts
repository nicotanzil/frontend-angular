import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-game-category',
  templateUrl: './home-game-category.component.html',
  styleUrls: ['./home-game-category.component.scss']
})
export class HomeGameCategoryComponent implements OnInit {

  buttons = {
    newTrendingBtn: true,
    topSellersBtn: false,
    popularBtn: false,
    specialsBtn: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClick(buttonId): void {
    Object.keys(this.buttons).forEach(key => {
      if (key === buttonId) {
        this.buttons[key] = true;
      }
      else {
        this.buttons[key] = false;
      }
    });
  }

}
