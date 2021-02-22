import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class AdminUserReportsService {

  constructor(
    private apollo: Apollo,
  ) { }

  getReportByReported = (id: number) => {
    return this.apollo.query<Query>({
      query: GET_REPORT_BY_REPORTED,
      variables: {
        id,
      }
    });
  }

}

const GET_REPORT_BY_REPORTED = gql`
  query getReportByReported($id:Int!) {
    getReportByReported(id:$id) {
      id
      reporter {
        id
        accountName
        avatar
      }
      description
      createdAt
    }
  }
`;
