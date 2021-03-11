import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';
import {InputCommunityArtPost} from '../../models/community/input-community-art-post';

@Injectable({
  providedIn: 'root'
})
export class CommunityArtworkService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getAllCommunityArtworks(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_COMMUNITY_ARTWORKS,
    });
  }

  like = (id: number) => {
    return this.apollo.mutate({
      mutation: LIKE,
      variables: {
        id,
      }
    });
  }

  dislike = (id: number) => {
    return this.apollo.mutate({
      mutation: DISLIKE,
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

  getTotalReviews(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_REVIEWS_BY_POST_ID,
      variables: {
        id,
      }
    });
  }

  addCommentByPostId = (postId: number, userId: number, comment: string) => {
    return this.apollo.mutate({
      mutation: ADD_COMMENT_BY_POST_ID,
      variables: {
        postId,
        userId,
        comment
      }
    });
  }

  createCommunityArtPost = (input: InputCommunityArtPost) => {
    return this.apollo.mutate({
      mutation: INSERT_ARTWORK,
      variables: {
        input,
      }
    });
  }

}


const GET_ALL_COMMUNITY_ARTWORKS = gql`
  query getCommunityArtPost {
    communityArtPosts {
      id
      link
      description
      like
      isImage
      user {
        id
        accountName
        profileName
        avatar
      }
      reviews {
        id
        comment
        user {
          id
          accountName
          profileName
          avatar
        }
      }
    }
  }
`;

const LIKE = gql`
  mutation like($id:Int!) {
    communityPostLike(postId:$id)
  }
`;

const DISLIKE = gql`
  mutation dislike($id:Int!) {
    communityPostDislike(postId:$id)
  }
`;

const GET_COMMENTS_BY_ID = gql`
  query GetCommunityArtPostReviewsByPostID($id:Int!, $page:Int!) {
    getCommunityArtPostReviewsByPostId(postId:$id, page:$page) {
      id
      comment
      user {
        profileName
        avatar
      }
    }
  }
`;

const GET_TOTAL_REVIEWS_BY_POST_ID = gql`
  query getTotalReviews($id:Int!) {
    getTotalReviewsByPostId(postId:$id)
  }
`;

const ADD_COMMENT_BY_POST_ID = gql`
  mutation addCommentByPostId($postId:Int!, $userId:Int!, $comment:String!) {
    addCommentByPostId(postId:$postId, userId:$userId, comment:$comment)
  }
`;

const INSERT_ARTWORK = gql`
  mutation createCommunityArtPost($input:InputCommunityArtPost!) {
    createCommunityArtPost(input:$input)
  }
`
