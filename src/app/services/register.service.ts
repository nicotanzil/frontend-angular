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
  generateOtp = (email, countryName) => {
    return this.apollo.mutate ({
      mutation: CREATE_OTP_MUTATION,
      variables: {
        email,
        countryName,
      }
    });
  }

  // Get OTP by Code
  getOtpByCode(code): Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getOTPByCode {
          getOtpByCode(code:"${code}") {
            email
            countryName
          }
        }
      `
    });
  }

  // Create New User
  createUser = (name, password, email, country) => {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        profileName: name,
        password,
        email,
        countryName: country,
      },
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

const CREATE_OTP_MUTATION = gql`
  mutation CreateOTP($email:String!, $countryName:String!) {
    createOtp(input:{email:$email, countryName:$countryName}) {
      id
      code
      email
      countryName
      validUntil
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($profileName:String!, $password:String!, $email:String!, $countryName:String!) {
    createUser(user:{profileName:$profileName, password:$password}, otp:{email:$email, countryName:$countryName})
  }
`;
