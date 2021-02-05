import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGamesService {

  constructor(
    private apollo: Apollo
  ) { }

  getGamesPagination(page): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAMES_PAGINATION,
      variables: {
        page,
      },
    });
  }
}

const GET_GAMES_PAGINATION = gql`
  query getGamesPagination($page:Int) {
    getGamePaginationAdmin(page:$page) {
      id
      name
    }
  }
`;
