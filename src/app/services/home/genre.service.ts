import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Query } from '../../models/query';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private apollo: Apollo
  ) { }

  getAllGenres(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GENRES,
    });
  }
}

const GET_GENRES = gql`
  query GetAllGenres {
    genres {
      name
    }
  }
`;
