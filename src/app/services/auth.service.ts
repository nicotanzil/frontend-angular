import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static isLoggedIn: boolean;

  constructor(
    private apollo: Apollo,
  ) {
  }

  getUserAuth(): Observable<Query> {
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
    summary
    avatar
    avatarFrame {
      id
      link
    }
    profileBackground {
      id
      link
    }
    miniProfileBackground {
      id
      link
    }
    theme {
      id
      color
    }
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
    games {
      id
      name
    }
    friends {
      id
      accountName
      profileName
      realName
      customURL
      summary
      avatar
      experience
      featuredBadge {
        id
        name
        xp
        link
      }
      miniProfileBackground {
        id
        link
      }
      avatarFrame {
        id
        link
      }
    }
  }
}
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
