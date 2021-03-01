import { Component, OnInit } from '@angular/core';
import {Promo} from '../../../models/promo';
import {AdminPromosService} from '../../../services/admin/admin-promos.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-promo-view',
  templateUrl: './admin-promo-view.component.html',
  styleUrls: ['./admin-promo-view.component.scss']
})
export class AdminPromoViewComponent implements OnInit {

  currentPage: number;
  totalPage: number;
  totalPromo: number;
  promos: Promo[];

  arrowLeft: boolean;
  arrowRight: boolean;

  constructor(
    private service: AdminPromosService,
    private router: Router,
  ) {
    this.promos = [];
  }

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

  update(id: number): void {
    this.router.navigate(['/admin/promos/update/' + id]);
  }

  remove(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.service.removePromo(id).subscribe(async query  => {
        console.log(query.data);
        this.loadContent();
      }, error => {
        console.log(error);
      });
    }
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
