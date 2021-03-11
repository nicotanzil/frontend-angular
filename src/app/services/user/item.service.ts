import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private apollo: Apollo
  ) {
  }

  // getItemCategoriesByUser = (userId: number) => {
  //   return this.apollo.mutate({
  //     mutation: GET_ITEM_CATEGORIES,
  //     variables: {
  //       requesterId,
  //     }
  //   });
  // };

  getItemCategoriesByUser(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ITEM_CATEGORIES,
      variables: {
        userId,
      }
    });
  }

  getItemsPaginate(userId: number, gameId: number, page: number, keyword: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: ITEM_PAGINATE,
      variables: {
        userId,
        gameId,
        page,
        keyword,
      }
    });
  }

  getTotalItems(userId: number, gameId: number, keyword: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_ITEM,
      variables: {
        userId,
        gameId,
        keyword,
      }
    });
  }
}

const GET_ITEM_CATEGORIES = gql`
  query getItemCategoriesByUser($userId:Int!) {
    getItemCategoriesByUser(user_id:$userId) {
      id
      name
      banner
    }
  }
`;

const ITEM_PAGINATE = gql`
  query ItemsPaginate($userId:Int!, $gameId:Int!, $page:Int!, $keyword:String!) {
    itemsPaginate(userId:$userId, gameId:$gameId, page:$page, keyword:$keyword) {
      id
      name
      link
      summary
      users {
        id
        accountName
      }
      game {
        id
        name
      }
    }
  }
`;

const GET_TOTAL_ITEM = gql`
query getTotalItems($userId:Int!, $gameId:Int!, $keyword:String!) {
  getTotalItems(userId:$userId, gameId:$gameId, keyword:$keyword)
}
`;
