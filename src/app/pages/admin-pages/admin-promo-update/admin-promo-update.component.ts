import { Component, OnInit } from '@angular/core';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';
import {InputPromo} from '../../../models/input/input-promo';
import {ActivatedRoute} from '@angular/router';
import {Promo} from '../../../models/promo';
import {Location} from '@angular/common';
import {NewPromo} from '../../../models/new/new-promo';
import {Game} from '../../../models/game';
import {AdminGamesService} from '../../../services/admin/admin-games.service';

@Component({
  selector: 'app-admin-promo-update',
  templateUrl: './admin-promo-update.component.html',
  styleUrls: ['./admin-promo-update.component.scss']
})
export class AdminPromoUpdateComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private service: AdminPromosService,
    private gameService: AdminGamesService,
    private location: Location,
  ) { }

  promoId: number;
  isSuccess: boolean;
  isError: boolean;

  validUntil: Date;
  updatePromo: NewPromo;
  games: Game[];
  gameId: number;

  ngOnInit(): void {
    this.updatePromo = new NewPromo();
    // this.validUntil = new Date();
    this.promoId = this.actRoute.snapshot.params.id;
    this.service.getPromoById(this.promoId).subscribe(async query => {
      // @ts-ignore
      const promo = query.data.getPromoById;
      this.promoId = promo.id;
      this.updatePromo.validUntil = promo.validUntil;
      this.validUntil = new Date(this.updatePromo.validUntil * 1000);
      this.updatePromo.discountPercentage = promo.discountPercentage;
      this.gameService.getAllGamesForPromo().subscribe(async res => {
        this.games = res.data.games;
        this.gameService.getGameByPromoId(this.promoId).subscribe(async res2 => {
          this.gameId = res2.data.getGameByPromoId.id;
        });
      });
    }, error => {
      console.log(error);
    });
  }

  update = (id: number) => {
    this.updatePromo.validUntil = Date.parse(this.validUntil.toString());
    this.updatePromo.validUntil = this.updatePromo.validUntil / 1000;

    this.service.updatePromo(this.updatePromo, this.promoId).subscribe(async query => {
      console.log(query);
      this.gameService.setGamePromo(this.gameId, this.promoId).subscribe(async res => {
        console.log(res);
        alert('Promo[' + this.promoId + '] updated');
      });
    }, error => {
      console.log(error);
    });
  }

  back(): void {
    this.location.back();
  }

}
