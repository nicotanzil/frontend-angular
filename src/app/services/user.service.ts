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

  redeemCode = (code: string, userId: number) => {
    return this.apollo.mutate({
      mutation: REDEEM_CODE,
      variables: {
        code,
        userId,
      }
    });
  }

  reportUser = (reporterId: number, reportedId: number, description: string) => {
    return this.apollo.mutate({
      mutation: REPORT_USER,
      variables: {
        reporterId,
        reportedId,
        description,
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
  }
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

const REDEEM_CODE = gql`
  mutation redeemCode($code:String!, $userId:Int!) {
    redeemCode(code:$code, userId:$userId)
  }
`;

const REPORT_USER = gql`
  mutation createUserReport($reporterId:Int!, $reportedId:Int!, $description:String!) {
    createUserReport(reporterId:$reporterId, reportedId:$reportedId, description:$description)
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
        latitude
        longitude
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
