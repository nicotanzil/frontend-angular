import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';
import {InputPromo} from '../../models/input/input-promo';

@Injectable({
  providedIn: 'root'
})
export class AdminPromosService {

  constructor(
    private apollo: Apollo
  ) { }

  getPromosPagination(page): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_PROMOS_PAGINATION,
      variables: {
        page,
      }
    });
  }

  getAllPromos(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_PROMOS,
    });
  }

  getTotalPromo(): Observable<Query> {
      return this.apollo.query<Query>({
        query: GET_TOTAL_PROMO,
      });
  }

  createPromo = (newPromo: InputPromo) => {
    return this.apollo.mutate({
      mutation: CREATE_PROMO_MUTATION,
      variables: {
        input: newPromo,
      }
    });
  }
}

const GET_ALL_PROMOS = gql`
  query getAllPromos {
    promos {
      id
      discountPercentage
      validUntil
    }
  }
`;

const GET_PROMOS_PAGINATION = gql`
  query getPromosPagination($page:Int) {
    getPromoPaginationAdmin(page:$page) {
      id
      discountPercentage
      validUntil
    }
  }
`;

const GET_TOTAL_PROMO = gql`
  query getTotalPromos {
    getTotalPromo
  }
`;

const CREATE_PROMO_MUTATION = gql`
  mutation createPromo($input:NewPromo!) {
    createPromo(input:$input) {
      id
      discountPercentage
      validUntil
    }
  }
`;
