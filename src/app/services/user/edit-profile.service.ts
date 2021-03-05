import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';
import {User} from '../../models/user';
import {UpdateUser} from '../../models/user/update-user';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(
    private apollo: Apollo,

  ) { }

  // Get all countries
  getCountries(): Observable<Query>{
    return this.apollo.query<Query>({
      query: GET_COUNTRIES_QUERY,
    });
  }

  updateUser = (updateUser: UpdateUser) => {
    return this.apollo.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: {
        updateUser,
      },
    });
  }

  themes(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_THEMES,
    });
  }

}

const GET_COUNTRIES_QUERY = gql`
  query GetAllCountries{
    countries {
      id
      name
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation update($updateUser:UpdateUser!) {
    updateUser(user:$updateUser)
  }
`;

const GET_ALL_THEMES = gql`
  query themes {
    themes{
      id
      name
      color
    }
  }
`
