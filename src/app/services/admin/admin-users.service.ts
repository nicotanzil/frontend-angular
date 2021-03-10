import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(
    private apollo: Apollo
  ) { }

  getAllUsersHeader(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_USERS_HEADER,
    });
  }

  getUsersPagination(page): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_USER_PAGINATION,
      variables: {
        page,
      }
    });
  }

  getAllUsersDetail(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_USERS_DETAIL,
    });
  }

  getTotalUser(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_USER,
    });
  }

  getUserById(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_USER_BY_ID,
      variables: {
        id,
      }
    });
  }

  updateAccountSuspension = (id: number) => {
    return this.apollo.mutate({
      mutation: UPDATE_ACCOUNT_SUSPENSION,
      variables: {
        id,
      }
    });
  }

  approveUnsuspend = (userId: number) => {
    return this.apollo.mutate({
      mutation: APPROVE_UNSUSPEND,
      variables: {
        userId,
      }
    });
  }

  unApproveUnsuspend = (userId: number) => {
    return this.apollo.mutate({
      mutation: UNAPPROVE_UNSUSPEND,
      variables: {
        userId,
      }
    });
  }
}

const GET_ALL_USERS_HEADER = gql`
  query getAllUsers{
    users {
      id
      accountName
      realName
      avatar
      isSuspend
    }
  }
`;

const GET_USER_PAGINATION = gql`
  query getUserPaginationAdmin($page:Int!) {
    getUserPaginationAdmin(page:$page) {
        id
        accountName
        realName
        avatar
        isSuspend
    }
  }
`;

const GET_ALL_USERS_DETAIL = gql`
  query getAllUsers{
    users {
      id
      accountName
      profileName
      realName
      summary
      avatar
      isSuspend
    }
  }
`;

const GET_TOTAL_USER = gql`
  query getTotalUser {
    getTotalUser
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($id:Int!) {
    getUserById(id:$id) {
      id
      accountName
      profileName
      realName
      summary
      avatar
      isSuspend
    }
  }
`;

const UPDATE_ACCOUNT_SUSPENSION = gql`
  mutation updateAccountSuspension($id:Int!) {
    updateAccountSuspension(id:$id)
  }
`;

const APPROVE_UNSUSPEND = gql`
  mutation approveUnsuspend($userId:Int!) {
    approveUnsuspend(userId:$userId)
  }
`;

const UNAPPROVE_UNSUSPEND = gql`
  mutation unApproveUnsuspend($userId:Int!) {
    unApproveUnsuspend(userId:$userId)
  }
`;
