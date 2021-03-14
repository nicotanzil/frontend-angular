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

  getPendingFriendRequestCount(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_PENDING_FRIEND_REQUEST_COUNT,
      variables: {
        id,
      }
    });
  }

  getFriendRequestByRequestedId(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_FRIEND_REQUEST_BY_REQUESTED_ID,
      variables: {
        id,
      }
    });
  }

  getFriendRequestByRequesterId(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_FRIEND_REQUEST_BY_REQUESTER_ID,
      variables: {
        id,
      }
    });
  }

  acceptFriendRequest = (id: number) => {
    return this.apollo.mutate({
      mutation: ACCEPT_FRIEND_REQUEST,
      variables: {
        id,
      }
    });
  }

  declineFriendRequest = (id: number) => {
    return this.apollo.mutate({
      mutation: DECLINE_FRIEND_REQUEST,
      variables: {
        id,
      }
    });
  }

  ignoreFriendRequest = (id: number) => {
    return this.apollo.mutate({
      mutation: IGNORE_FRIEND_REQUEST,
      variables: {
        id,
      }
    });
  }

  createFriendRequestCode = (requesterId: number, code: number) => {
    return this.apollo.mutate({
      mutation: CREATE_FRIEND_REQUEST_CODE,
      variables: {
        requesterId,
        code,
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

const GET_PENDING_FRIEND_REQUEST_COUNT = gql`
  query getPendingFriendRequestCount($id:Int!) {
    getPendingFriendRequestCount(id:$id)
  }
`;

const GET_FRIEND_REQUEST_BY_REQUESTED_ID = gql`
  query getFriendRequestByRequestedId($id:Int!) {
    getFriendRequestByRequestedId(id:$id)  {
      id
      requester {
        id
        accountName
        avatar
        experience
        customURL
      }
      requested {
        id
        accountName
        avatar
        experience
        customURL
      }
    }
  }
`;

const GET_FRIEND_REQUEST_BY_REQUESTER_ID = gql`
  query getFriendRequestByRequesterId($id:Int!) {
    getFriendRequestByRequesterId(id:$id)  {
      id
      requester {
        id
        accountName
        avatar
        experience
        customURL
      }
      requested {
        id
        accountName
        avatar
        experience
        customURL
      }
    }
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($id:Int!) {
    acceptFriendRequest(id:$id)
  }
`;

const DECLINE_FRIEND_REQUEST = gql`
  mutation declineFriendRequest($id:Int!) {
    declineFriendRequest(id:$id)
  }
`;

const IGNORE_FRIEND_REQUEST = gql`
  mutation ignoreFriendRequest($id:Int!) {
    ignoreFriendRequest(id:$id)
  }
`;

const CREATE_FRIEND_REQUEST_CODE = gql`
  mutation createFriendRequestCode($requesterId:Int!, $code:Int!) {
    createFriendRequestCode(requesterId:$requesterId, code:$code)
  }
`;
