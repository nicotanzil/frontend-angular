import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(
    private apollo: Apollo
  ) {
  }

  createFriendRequest = (requesterId: number, requestedId: number) => {
    return this.apollo.mutate({
      mutation: CREATE_FRIEND_REQUEST,
      variables: {
        requesterId,
        requestedId
      }
    });
  };

  validateFriendRequest(requesterId: number, requestedId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: VALIDATE_FRIEND_REQUEST,
      variables: {
        requesterId,
        requestedId
      }
    });
  }
}

const CREATE_FRIEND_REQUEST = gql`
  mutation createFriendRequest($requesterId:Int!,$requestedId:Int!) {
    createFriendRequest(requesterId:$requesterId,requestedId:$requestedId)
  }
`;

const VALIDATE_FRIEND_REQUEST = gql`
  query validateFriendRequestExists($requesterId:Int!,$requestedId:Int!) {
    validateFriendRequestExists(requesterId:$requesterId,requestedId:$requestedId)
  }
`;
