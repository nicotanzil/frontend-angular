import { Component, OnInit } from '@angular/core';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';
import {InputPromo} from '../../../models/input/input-promo';
import {ActivatedRoute} from '@angular/router';
import {Promo} from '../../../models/promo';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-promo-update',
  templateUrl: './admin-promo-update.component.html',
  styleUrls: ['./admin-promo-update.component.scss']
})
export class AdminPromoUpdateComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private service: AdminPromosService,
    private location: Location,
  ) { }

  promoId: number;
  isSuccess: boolean;
  isError: boolean;

  validUntil: Date;
  updatePromo: InputPromo;

  ngOnInit(): void {
    this.updatePromo = new InputPromo();
    // this.validUntil = new Date();
    this.promoId = this.actRoute.snapshot.params.id;
    console.log(this.promoId);
    this.service.getPromoById(this.promoId).subscribe(async query => {
      // @ts-ignore
      const promo = query.data.getPromoById;
      this.promoId = promo.id;
      this.updatePromo.validUntil = promo.validUntil;
      this.validUntil = new Date(this.updatePromo.validUntil * 1000);
      console.log(this.validUntil);
      this.updatePromo.discountPercentage = promo.discountPercentage;
    }, error => {
      console.log(error);
    });
  }

  update = (id: number) => {
    this.updatePromo.validUntil = Date.parse(this.validUntil.toString());
    this.updatePromo.validUntil = this.updatePromo.validUntil / 1000;

    this.service.updatePromo(this.updatePromo, this.promoId).subscribe(async query => {
      console.log(query);
      alert('Promo[' + this.promoId + '] updated');
    }, error => {
      console.log(error);
    });
  }

  back(): void {
    this.location.back();
  }

}
