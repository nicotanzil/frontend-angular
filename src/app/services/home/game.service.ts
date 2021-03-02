import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private apollo: Apollo
  ) { }

  gameSearch(keyword: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: GAME_SEARCH,
      variables: {
        keyword,
      }
    });
  }

  getSpecialOfferGames(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_SPECIAL_OFFER_GAMES,
    });
  }

  getNewTrendingGames(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_NEW_TRENDING_GAMES,
    });
  }
}

const GAME_SEARCH = gql`
  query getSearchGame($keyword:String!) {
    gameSearch(keyword:$keyword) {
      id
      name
      originalPrice
      banner
    }
  }
`;

const GET_SPECIAL_OFFER_GAMES = gql`
  query getSpecialOffers{
    getSpecialOfferGame {
      id
      name
      originalPrice
      banner
      images {
        id
        link
      }
      promo {
        discountPercentage
      }
      tags {
        id
        name
      }
    }
  }
`;

const GET_NEW_TRENDING_GAMES = gql`
  query getNewTrendingGame{
    getNewTrendingGame {
      id
      name
      originalPrice
      banner
      images {
        id
        link
      }
      promo {
        discountPercentage
      }
      tags {
        id
        name
      }
    }
  }
`;
