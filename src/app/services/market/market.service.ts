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
  };

  createBuyListing = (bidId: number, buy: number) => {
    return this.apollo.mutate({
      mutation: CREATE_BUY_LISTING,
      variables: {
        bidId,
        buy,
      }
    });
  };

  getItemType(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ITEM_TYPE,
      variables: {
        id
      }
    });
  }

  getHighestBuyListings(id: number): any {
    return this.apollo.watchQuery<any>({
      query: GET_HIGHEST_BUY_LISTINGS,
      variables: {
        id,
      },
      pollInterval: 5000,
    });
  }

  getLowestSellListings(id: number): any {
    return this.apollo.watchQuery<Query>({
      query: GET_LOWEST_SELL_LISTINGS,
      variables: {
        id,
      },
      pollInterval: 5000,
    });
  }

  createBid = (typeId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: CREATE_BID,
      variables: {
        typeId,
        userId
      }
    });
  };

  getSellListingsByUser(userId: number, typeId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_SELL_LISTINGS_BY_USER,
      variables: {
        userId,
        typeId
      }
    });
  }

  getBuyListingsByUser(userId: number, typeId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_BUY_LISTINGS_BY_USER,
      variables: {
        userId,
        typeId
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

const CREATE_BUY_LISTING = gql`
  mutation createBuyListing($bidId:Int!, $buy:Int!) {
    createBuyListing(bidId:$bidId, buy:$buy)
  }
`;

const CREATE_SELL_LISTING = gql`
  mutation createSellListing($itemId:Int!, $sell:Int!) {
    createSellListing(itemId:$itemId, sell:$sell)
  }
`;

const GET_ITEM_TYPE = gql`
  query getItemType($id:Int!) {
    getItemType(id:$id) {
      id
      name
      summary
      link
      game {
        id
        name
      }
    }
  }
`;


const GET_LOWEST_SELL_LISTINGS = gql`
  query getSellListingsData($id:Int!) {
    getSellListingsData(typeId:$id) {
      price
      listing_count
    }
  }
`;

const GET_HIGHEST_BUY_LISTINGS = gql`
  query getBuyListingsData($id:Int!) {
    getBuyListingsData(typeId:$id) {
      price
      listing_count
    }
  }
`;

const CREATE_BID = gql`
  mutation createBid($typeId:Int!, $userId:Int!) {
    createBid(typeId:$typeId, userId:$userId) {
      id
    }
  }
`;

const GET_SELL_LISTINGS_BY_USER = gql`
  query getSellListingsByUser($userId:Int!, $typeId:Int!) {
    getSellListingsByUser(userId:$userId, typeId:$typeId) {
      sell
      item {
        id
      }
      createdAt
    }
  }
`;

const GET_BUY_LISTINGS_BY_USER = gql`
  query getBuyListingsByUser($userId:Int!, $typeId:Int!) {
    getBuyListingsByUser(userId:$userId, typeId:$typeId) {
      buy
      createdAt
    }
  }
`;
