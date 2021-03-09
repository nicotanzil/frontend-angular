import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class CommunityGameReviewService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getAllGameReviews(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_GAME_REVIEWS,
    });
  }

  helpful = (id: number) => {
    return this.apollo.mutate({
      mutation: HELPFUL,
      variables: {
        id,
      }
    });
  }

  notHelpful = (id: number) => {
    return this.apollo.mutate({
      mutation: NOT_HELPFUL,
      variables: {
        id,
      }
    });
  }

  getCommentsById(id: number, page: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_COMMENTS_BY_ID,
      variables: {
        id,
        page
      }
    });
  }

  getTotalComments(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_COMMENTS,
      variables: {
        id,
      }
    });
  }

  addCommentByReviewId = (reviewId: number, userId: number, comment: string) => {
    return this.apollo.mutate({
      mutation: ADD_COMMENT_BY_REVIEW_ID,
      variables: {
        reviewId,
        userId,
        comment
      }
    });
  }
}

const GET_ALL_GAME_REVIEWS = gql`
  query getCommunityGameReviews {
    communityGameReviews {
      id
      description
      user {
        id
        profileName
        avatar
      }
      game {
        id
        name
        banner
      }
      helpfulCount
      isRecommended
    }
  }
`;

const GET_COMMENTS_BY_ID = gql`
  query getGameReviewCommentsByReviewId($id:Int!, $page:Int!) {
    getCommunityGameReviewCommentByReviewId(reviewId:$id, page:$page) {
      id
      user {
        id
        profileName
        avatar
      }
      description
    }
  }
`;

const GET_TOTAL_COMMENTS = gql`
  query getTotalComments($id:Int!) {
    getTotalCommentByReviewId(reviewId:$id)
  }
`;

const HELPFUL = gql`
  mutation helpful($id:Int!) {
    communityReviewHelpful(reviewId:$id)
  }
`;

const NOT_HELPFUL = gql`
  mutation notHelpful($id:Int!) {
    communityReviewNotHelpful(reviewId:$id)
  }
`;

const ADD_COMMENT_BY_REVIEW_ID = gql`
  mutation addCommentByReviewId($reviewId:Int!, $userId:Int!, $comment:String!) {
    addCommentByReviewId(reviewId:$reviewId, userId:$userId, comment:$comment)
  }
`
