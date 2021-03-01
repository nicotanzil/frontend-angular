import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private apollo: Apollo
  ) { }

  getAllTags(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TAGS,
    });
  }
}

const GET_TAGS = gql`
  query GetAllTags {
    tags {
      id
      name
    }
  }
`;

