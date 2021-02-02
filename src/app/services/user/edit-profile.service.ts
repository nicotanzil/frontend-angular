import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

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
  mutation UpdateUser($accountName:String!, $profileName:String!,
  $realName:String!, $customUrl:String!, $summary:String!,
  $avatar:String!, $avatarFrames:String!, $profileBackground:String!,
  $miniProfileBackground:String!, $theme:String!, $countryId:Int!) {
  updateUser(user:{accountName:$accountName, profileName:$profileName,
    realName:$realName, customURL:$customUrl, summary:$summary,
    avatar:$avatar, avatarFrames:$avatarFrames,
    profileBackground:$profileBackground,
    miniProfileBackground:$miniProfileBackground,
    theme:$theme, CountryId:$countryId})
}
`;
