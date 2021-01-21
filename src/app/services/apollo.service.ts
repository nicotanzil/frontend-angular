import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { Query } from "../models/query";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(
    private apollo: Apollo, 
  ) { }

  getCountries():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetCountries{
          countries {
            id,
            name
          }
        }
      `
    })
  }
}
