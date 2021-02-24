import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchGameService {

  constructor(
    private apollo: Apollo,
  ) { }

  getSearchGamePage(keyword: string, page: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: SEARCH_GAME_PAGE,
      variables: {
        keyword,
        page,
      }
    });
  }
}

const SEARCH_GAME_PAGE = gql`
  query getSearchGamePage($keyword:String!, $page:Int!) {
    gameSearchPage(keyword:$keyword, page:$page) {
      id
      name
      banner
      originalPrice
      createdAt
    }
  }
`;
