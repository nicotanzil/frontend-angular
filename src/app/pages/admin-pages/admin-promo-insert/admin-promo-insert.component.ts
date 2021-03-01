import { Component, OnInit } from '@angular/core';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';
import {InputPromo} from '../../../models/input/input-promo';
import {Location} from '@angular/common';
import {NewPromo} from '../../../models/new/new-promo';
import {AdminGamesService} from '../../../services/admin/admin-games.service';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-admin-promo-insert',
  templateUrl: './admin-promo-insert.component.html',
  styleUrls: ['./admin-promo-insert.component.scss']
})
export class AdminPromoInsertComponent implements OnInit {

  isSuccess: boolean;
  isError: boolean;

  validUntil: Date;
  newPromo: NewPromo;
  games: Game[];
  gameId: number;

  constructor(
    private service: AdminPromosService,
    private gameService: AdminGamesService,
    private location: Location,
  ) {
    this.games = [];
  }


  ngOnInit(): void {
    this.newPromo = new NewPromo();
    this.validUntil = new Date();
    this.gameService.getAllGamesForPromo().subscribe(async query => {
      this.games = query.data.games;
    });
  }

  onSave(): void {
    this.newPromo.validUntil = Date.parse(this.validUntil.toString());
    this.newPromo.validUntil = this.newPromo.validUntil / 1000;
    this.service.createPromo(this.newPromo).subscribe(async query => {
      // @ts-ignore
      const data = query.data.createPromo;
      this.gameService.setGamePromo(this.gameId, data.id).subscribe(async res => {
        console.log(res);
        alert('Promo[' + data.id + '] inserted');
      });
    }, error => {
      console.log('There has been an error: ', error);
    });
  }

  back(): void {
    this.location.back();
  }
}
