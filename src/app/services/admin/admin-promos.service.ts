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

  updatePromo = (newPromo: InputPromo, id: number) => {
    return this.apollo.mutate({
      mutation: UPDATE_PROMO,
      variables: {
        input: newPromo,
        id,
      }
    });
  }

  removePromo = (id: number) => {
    return this.apollo.mutate({
      mutation: REMOVE_PROMO,
      variables: {
        id,
      }
    });
  }

  getPromoById = (id: number) => {
    return this.apollo.query<Query>({
      query: GET_PROMO_BY_ID,
      variables: {
        id,
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

const UPDATE_PROMO = gql`
  mutation updatePromo($input:NewPromo!,$id:Int!) {
    updatePromo(input:$input, id:$id) {
      id
      discountPercentage
    }
  }
`;

const REMOVE_PROMO = gql`
  mutation removePromo($id:Int!) {
    deletePromo(id:$id) {
      id
      discountPercentage
    }
  }
`;

const GET_PROMO_BY_ID = gql`
  query getPromoById($id:Int!) {
    getPromoById(id:$id) {
      id
      discountPercentage
      validUntil
    }
  }
`;
