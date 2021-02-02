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
}


const GET_USER_BY_URL = gql`
  query GetUserByURL($url:String) {
    getUserByUrl(input:$url) {
      profileName
      realName
      email
      balance
      customURL
      avatar
      profileBackground
      experience
      summary
      country {
        id
        name
      }
    }
  }
`;
