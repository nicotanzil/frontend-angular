import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';
import {Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GameDiscussionService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getGamesForDiscussion(keyword: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAMES_FOR_DISCUSSION,
      variables: {
        keyword,
      }
    });
  }

  insertDiscussionThread = (title: string, description: string, gameId: number, userId: number) => {
    return this.apollo.mutate({
      mutation: INSERT_DISCUSSION_THREAD,
      variables: {
        title,
        description,
        gameId,
        userId,
      }
    });
  };

  getGameDiscussionByDiscussionId(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAME_DISCUSSION_BY_DISCUSSION_ID,
      variables: {
        id,
      }
    });
  }

  insertCommentByReviewId = (reviewId: number, userId: number, comment: string) => {
    return this.apollo.mutate({
      mutation: INSERT_COMMENT_BY_REVIEW_ID,
      variables: {
        reviewId,
        userId,
        comment,
      }
    });
  };
}

const GET_GAMES_FOR_DISCUSSION = gql`
  query getGamesForDiscussions($keyword:String!) {
    getGamesForDiscussions(keyword:$keyword) {
      id
      name
      banner
      discussions {
        id
        title
        user {
          id
          profileName
        }
        replies {
          id
        }
      }
      createdAt
    }
  }
`;

const INSERT_DISCUSSION_THREAD = gql`
 mutation insertDiscussionThread($title:String!, $description:String!, $gameId:Int!, $userId:Int!) {
    insertDiscussionThread(title:$title, description:$description, gameId:$gameId, userId:$userId)
  }
`;

const GET_GAME_DISCUSSION_BY_DISCUSSION_ID = gql`
  query getGameDiscussionByDiscussionID($id:Int!) {
    getGameDiscussionByDiscussionID(id:$id) {
      id
      title
      description
      game{
        id
        name
        banner
      }
      user {
        id
        profileName
        avatar
      }
      replies {
        id
        description
        user {
          id
          profileName
          avatar
        }
      }
    }
  }
`;

const INSERT_COMMENT_BY_REVIEW_ID = gql`
  mutation insertCommentByReviewId($reviewId:Int!, $userId:Int!, $comment:String!) {
    insertCommentByReviewId(reviewId:$reviewId, userId:$userId, comment:$comment)
  }
`;
