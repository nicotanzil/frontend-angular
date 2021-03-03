import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../models/query';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getUserByUrl(url): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_USER_BY_URL,
      variables: {
        url,
      },
    });
  }

  getUserByAccountName(accountName: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_USER_BY_ACCOUNT_NAME,
      variables: {
        accountName,
      }
    });
  }

  addFriend = (userId: number, friendId: number) => {
    return this.apollo.mutate({
      mutation: ADD_FRIEND,
      variables: {
        userId,
        friendId,
      }
    });
  };
}

const GET_USER_BY_ACCOUNT_NAME = gql`
  query getUserByAccountName($accountName:String!) {
    getUseByAccountName(accountName:$accountName) {
      id
    }
  }
`;

const ADD_FRIEND = gql`
  mutation addFriend($userId:Int!, $friendId:Int!) {
    addFriend(userId:$userId, friendId:$friendId)
  }
`;

const GET_USER_BY_URL = gql`
  query GetUserByURL($url:String) {
    getUserByUrl(input:$url) {
      id
      accountName
      profileName
      realName
      email
      balance
      customURL
      summary
      avatar
      avatarFrame
      profileBackground
      miniProfileBackground
      theme
      experience
      country {
        id
        name
      }
      badges {
        id
        name
        link
        xp
        createdAt
      }
      featuredBadge {
        id
        name
        link
        xp
        createdAt
      }
      friends {
        id
        accountName
        profileName
        realName
        customURL
        summary
        avatar
        avatarFrame
        profileBackground
        miniProfileBackground
        theme
        experience
      }
    }
  }
`;
