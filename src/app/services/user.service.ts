import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Query } from '../models/query';
import { Observable } from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  getUserByUrl(url): Observable<Query>{
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
}

const GET_USER_BY_ACCOUNT_NAME = gql`
  query getUserByAccountName($accountName:String!) {
    getUseByAccountName(accountName:$accountName) {
      id
    }
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
    }
  }
`;
