import { Component, OnInit } from '@angular/core';
import {Promo} from '../../../models/promo';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';

@Component({
  selector: 'app-admin-promo-view',
  templateUrl: './admin-promo-view.component.html',
  styleUrls: ['./admin-promo-view.component.scss']
})
export class AdminPromoViewComponent implements OnInit {

  constructor(
    private service: AdminPromosService
  ) { }

  currentPage: number;
  totalPage: number;
  totalPromo: number;
  promos: Promo[];

  arrowLeft: boolean;
  arrowRight: boolean;

  ngOnInit(): void {
    this.currentPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
  }

  loadContent = () => {
    console.log(this.currentPage);
    this.service.getPromosPagination(this.currentPage).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.promos = query.data.getPromoPaginationAdmin;
        this.getTotalPromos();
        console.log(this.promos);
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  getTotalPromos = () => {
    this.service.getTotalPromo().subscribe(async query => {
      this.totalPromo = query.data.getTotalPromo;
      this.totalPage = Math.ceil(this.totalPromo / 5);
      this.updateControl();
    });
  }

  remove(id: number): void {
  }

  updateControl(): void {
    if (this.currentPage <= 1) {
      this.arrowLeft = false;
    }
    else {
      this.arrowLeft = true;
    }
    if (this.currentPage >= this.totalPage) {
      this.arrowRight = false;
    }
    else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.currentPage >= this.totalPage) { return; }
    this.currentPage++;
    this.loadContent();
  }

  moveLeft = () => {
    if (this.currentPage < this.totalPage) { return; }
    this.currentPage--;
    this.loadContent();
  }

}
