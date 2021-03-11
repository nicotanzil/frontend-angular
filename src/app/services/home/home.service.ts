import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getTopSeller(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOP_SELLER,
    });
  }

  getTopReview(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOP_REVIEW,
    });
  }
}

const GET_TOP_SELLER = gql`
  query getTopSellerGames{
    getTopSellerGames {
      game_id
      game_name
      game_price
      game_banner
      game_discount
      purchase_count
    }
  }
`;

const GET_TOP_REVIEW = gql`
 query getTopReviewGames{
  getTopReviewGames {
    game_id
    game_name
    game_price
    game_banner
    game_discount
    review_count
  }
}
`;
