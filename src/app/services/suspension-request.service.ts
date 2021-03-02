import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {InputSuspensionRequest} from '../models/input/input-suspension-request';
import {Observable} from 'rxjs';
import {Query} from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class SuspensionRequestService {

  constructor(
    private apollo: Apollo
  ) { }

  createSuspensionRequest = (request: InputSuspensionRequest) => {
    return this.apollo.mutate( {
      mutation: CREATE_SUSPENSION_REQUEST,
      variables: {
        request,
      }
    });
  }

  getSuspensionRequestsById(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_SUSPENSION_REQUESTS_BY_ID,
      variables: {
        id,
      }
    });
  }
}

const CREATE_SUSPENSION_REQUEST = gql`
  mutation createSuspensionRequest($request:InputSuspensionRequest!) {
    createSuspensionRequest(request:$request)
  }
`;

const GET_SUSPENSION_REQUESTS_BY_ID = gql`
  query getSuspensionRequestByUserId($id:Int!) {
    suspensionRequestsByUserId(id:$id) {
      id
      description
      user {
        id
        accountName
        avatar
      }
      createdAt
    }
  }
`;
