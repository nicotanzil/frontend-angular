import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private apollo: Apollo
  ) {
  }

  insertGameToCart = (gameId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: INSERT_GAME_TO_CART,
      variables: {
        gameId,
        userId
      }
    });
  };

  getCartGamesByUserId = (id: number) => {
    return this.apollo.query<Query>({
      query: GET_CART_GAMES_BY_USER_ID,
      variables: {
        id,
      }
    });
  };

  removeGameFromCart = (gameId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: REMOVE_GAME_FROM_CART,
      variables: {
        gameId,
        userId,
      }
    });
  }
}

const INSERT_GAME_TO_CART = gql`
  mutation insertGameToCart($gameId:Int!, $userId:Int!) {
    insertGameToCart(gameId:$gameId,userId:$userId)
  }
`;

const GET_CART_GAMES_BY_USER_ID = gql`
  query getCartGamesByUserId($id:Int!) {
    getCartGamesByUserId(id:$id) {
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

const REMOVE_GAME_FROM_CART = gql`
  mutation removeGameFromCart($gameId:Int!, $userId:Int!) {
    removeGameFromCart(gameId:$gameId,userId:$userId)
  }
`;
