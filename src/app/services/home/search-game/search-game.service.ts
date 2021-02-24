import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../../models/query';
import {Observable} from 'rxjs';
import {InputTag} from '../../../models/input/input-tag';

@Injectable({
  providedIn: 'root'
})
export class SearchGameService {

  constructor(
    private apollo: Apollo,
  ) { }

  getSearchGamePage(keyword: string, page: number, price: number, tags: InputTag[]): Observable<Query> {
    return this.apollo.query<Query>({
      query: SEARCH_GAME_PAGE,
      variables: {
        keyword,
        page,
        price,
        tags,
      }
    });
  }
}

const SEARCH_GAME_PAGE = gql`
  query getSearchGamePage($keyword:String!, $page:Int!, $price:Int!, $tags:[InputTag!]!) {
    gameSearchPage(keyword:$keyword, page:$page, price:$price, tag:$tags) {
      id
      name
      banner
      originalPrice
      createdAt
      tags {
        id
        name
      }
    }
  }
`;
