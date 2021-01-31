import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo,
  ) { }

  getUserAuth(): Observable<Query>{
    return this.apollo.query<Query>({
      query: GET_USER_AUTH,
    });
  }

  logout = () => {
    return this.apollo.mutate({
      mutation: LOGOUT,
    });
  }
}

const GET_USER_AUTH = gql`
  query GetUserAuth {
    getUserAuth {
      id
      accountName
      profileName
      realName
      email
      balance
      customURL
      profilePicture
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
