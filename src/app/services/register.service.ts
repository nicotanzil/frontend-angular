import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import {Otp} from '../models/otp';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private apollo: Apollo,

  ) { }

  // Get all countries
  getCountries(): Observable<Query>{
    return this.apollo.query<Query>({
      query: GET_COUNTRIES_QUERY,
    });
  }



  // Create OTP
  generateOtp = (email, countryId) => {
    return this.apollo.mutate ({
      mutation: CREATE_OTP_MUTATION,
      variables: {
        email,
        countryId,
      }
    });
  }

  // Get OTP by Code
  getOtpByCode(code): Observable<Query>{
    return this.apollo.query<Query>({
      query: GET_OTP_BY_CODE,
      variables: {
        code,
      }
    });
  }

  // Create New User
  createUser = (name, password, email, countryId) => {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        accountName: name,
        password,
        email,
        countryId,
      },
    });
  }
}

const GET_OTP_BY_CODE = gql`
  query getOTPByCode($code:String!) {
  getOtpByCode(code:$code) {
    email
    countryId
  }
}
`;

const GET_COUNTRIES_QUERY = gql`
  query GetAllCountries{
    countries {
      id
      name
    }
  }
`;

const CREATE_OTP_MUTATION = gql`
  mutation CreateOTP($email:String!, $countryId:Int!) {
    createOtp(input:{email:$email, countryId:$countryId}) {
      id
      code
      email
      countryId
      validUntil
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser($accountName:String!, $password:String!, $email:String!, $countryId:Int!) {
    createUser(user:{accountName:$accountName, password:$password}, otp:{email:$email, countryId:$countryId})
  }
`;
