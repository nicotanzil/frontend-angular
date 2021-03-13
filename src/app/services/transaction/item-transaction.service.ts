import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class ItemTransactionService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getPreviousTransactionData(typeId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_PREVIOUS_TRANSACTION_DATA,
      variables: {
        typeId,
      }
    });
  }

}

const GET_PREVIOUS_TRANSACTION_DATA = gql`
  query getPreviousTransactionData($typeId:Int!) {
    getPreviousTransactionData(typeId:$typeId) {
      price
      date
    }
  }
`;
