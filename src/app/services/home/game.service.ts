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

  getGameById(id: number): Observable<Query>{
    return this.apollo.query<Query>({
      query: GET_GAME_BY_ID,
      variables: {
        id,
      }
    });
  }

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

  getGamesByMultipleId(ids: number[]): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAMES_BY_MULTIPLE_ID,
      variables: {
        ids,
      }
    });
  }
}

const GET_GAME_BY_ID = gql`
  query getGameById($id:Int!){
    gameById(id:$id){
      id
      name
      description
      releaseDate
      genres {
        id
        name
      }
      tags {
        id
        name
      }
      originalPrice
      promo {
        id
        discountPercentage
      }
      developers{
        id
        name
      }
      publisher {
        id
        name
      }
       system {
        id
        os
      }
      banner
      video {
        id
        link
      }
      images {
        id
        link
      }
      createdAt
    }
  }
`;

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
      createdAt
    }
  }
`;

const GET_GAMES_BY_MULTIPLE_ID = gql`
   query gameByMultipleId($ids:[Int!]!) {
     gameByMultipleId(ids:$ids) {
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
