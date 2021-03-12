import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getTopTransactionItemTypes(page: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: TOP_TRANSACTION_ITEM_TYPES,
      variables: {
        page,
      }
    });
  }

  getTotalTopTransaction(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_TOP_TRANSACTION_ITEM_TYPES,
    });
  }

  createSellListing = (itemId: number, sell: number) => {
    return this.apollo.mutate({
      mutation: CREATE_SELL_LISTING,
      variables: {
        itemId,
        sell,
      }
    });
  }
}


const TOP_TRANSACTION_ITEM_TYPES = gql`
  query topTransactionItemTypes($page:Int!) {
    topTransactionItemTypes(page:$page) {
      item_type_id
      item_name
      item_link
      game_name
      transaction_count
    }
  }
`;

const GET_TOTAL_TOP_TRANSACTION_ITEM_TYPES = gql`
  query getTotalTopTransactionItemTypes {
    getTotalTopTransactionItemTypes
  }
`;

const CREATE_SELL_LISTING = gql`
  mutation createSellListing($itemId: Int!, $sell:Int!) {
    createSellListing(itemId:$itemId, sell:$sell)
  }
`;
