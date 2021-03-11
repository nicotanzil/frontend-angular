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

  getPreviousTransactionData(itemId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_PREVIOUS_TRANSACTION_DATA,
      variables: {
        itemId,
      }
    });
  }

}

const GET_PREVIOUS_TRANSACTION_DATA = gql`
  query getPreviousTransactionData($itemId:Int!) {
    getPreviousTransactionData(itemId:$itemId) {
      id
      price
      createdAt
    }
  }
`;
