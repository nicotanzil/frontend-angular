import { Component, OnInit } from '@angular/core';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';
import {InputPromo} from '../../../models/input/input-promo';

@Component({
  selector: 'app-admin-promo-insert',
  templateUrl: './admin-promo-insert.component.html',
  styleUrls: ['./admin-promo-insert.component.scss']
})
export class AdminPromoInsertComponent implements OnInit {

  constructor(
    private service: AdminPromosService,
  ) { }

  isSuccess: boolean;
  isError: boolean;

  validUntil: Date;
  newPromo: InputPromo;

  ngOnInit(): void {
    this.newPromo = new InputPromo();
    this.validUntil = new Date();
  }

  onSave(): void {
    this.newPromo.validUntil = Date.parse(this.validUntil.toString());
    console.log(this.newPromo);
    this.service.createPromo(this.newPromo).subscribe(async query => {
      console.log('Success');
      // @ts-ignore
      const data = query.data.createPromo;
      alert('Promo[' + data.id + '] inserted');
    }, error => {
      console.log('There has been an error: ', error);
    });
  }

}
