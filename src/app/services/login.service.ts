import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apollo: Apollo,
  ) { }

  loginMutation = (accountName, password) => {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        accountName,
        password,
      }
    });
  }

  adminLoginMutation = (accountName, password) => {
    return this.apollo.mutate({
      mutation: ADMIN_LOGIN_MUTATION,
      variables: {
        accountName,
        password,
      }
    })
  }
}

const LOGIN_MUTATION = gql`
  mutation Login($accountName:String!, $password:String!) {
    login(input:{accountName:$accountName, password:$password})
  }
`;

const ADMIN_LOGIN_MUTATION = gql`
  mutation AdminLogin($accountName:String!, $password:String!) {
    adminLogin(input:{accountName:$accountName, password:$password})
  }
`;
