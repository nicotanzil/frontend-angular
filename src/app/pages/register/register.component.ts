import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Country } from 'src/app/models/country';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  countries: Country[]; 
  constructor(
    private service: ApolloService,
  ) { }


  ngOnInit(): void {
    this.service.getCountries().subscribe(async query => {
      this.countries = query.data.countries; 
      console.log(this.countries);
    });
  }
}
