import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apollo: Apollo,
  ) { }

  loginMutation = (profileName, password) => {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        profileName,
        password,
      }
    });
  }
}

const LOGIN_MUTATION = gql`
  mutation Login($profileName:String!, $password:String!) {
    login(input:{profileName:$profileName, password:$password})
  }
`;
