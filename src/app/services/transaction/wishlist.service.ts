import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private apollo: Apollo
  ) {
  }

  insertGameToWishlist = (gameId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: INSERT_GAME_TO_WISHLIST,
      variables: {
        gameId,
        userId
      }
    });
  };

  getWishlistGamesByUserId = (id: number) => {
    return this.apollo.query<Query>({
      query: GET_WISHLIST_GAMES_BY_USER_ID,
      variables: {
        id,
      }
    });
  };

  removeGameFromWishlist = (gameId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: REMOVE_GAME_FROM_WISHLIST,
      variables: {
        gameId,
        userId,
      }
    });
  }
}

const INSERT_GAME_TO_WISHLIST = gql`
  mutation insertGameToWishlist($gameId:Int!, $userId:Int!) {
    insertGameToWishlist(gameId:$gameId,userId:$userId)
  }
`;

const GET_WISHLIST_GAMES_BY_USER_ID = gql`
  query getWishlistByUserId($id:Int!) {
    getWishlistByUserId(id:$id) {
      id
      name
      originalPrice
      banner
      promo {
        id
        discountPercentage
      }
    }
  }
`;

const REMOVE_GAME_FROM_WISHLIST = gql`
  mutation removeGameFromWishlist($gameId:Int!, $userId:Int!) {
    removeGameFromWishlist(gameId:$gameId,userId:$userId)
  }
`;

