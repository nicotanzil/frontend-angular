import { Component, OnInit } from '@angular/core';
import {AdminUsersService} from '../../../services/admin/admin-users.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../models/user';
import {async} from 'rxjs';
import {UserReport} from '../../../models/user-report';
import {AdminUserReportsService} from '../../../services/admin/admin-user-reports.service';
import {SuspensionRequest} from '../../../models/suspension-request';
import {SuspensionRequestService} from '../../../services/suspension-request.service';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {

  userId: number;
  user: User;
  userReports: UserReport[];
  suspensionRequests: SuspensionRequest[];

  constructor(
    private actRoute: ActivatedRoute,
    private serviceUser: AdminUsersService,
    private serviceUserReport: AdminUserReportsService,
    private serviceSuspensionRequest: SuspensionRequestService,
    private location: Location,
  ) {
    this.user = new User();
    this.userReports = [];
    this.suspensionRequests = [];
  }

  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.params.id;
    this.serviceUser.getUserById(this.userId).subscribe(async query => {
      this.user = query.data.getUserById;
    }, error => {
      console.log(error);
    });

    this.serviceUserReport.getReportByReported(this.userId).subscribe(async query => {
      // @ts-ignore
      this.userReports = query.data.getReportByReported;
      console.log(this.userReports);
    }, error => {
      console.log(error);
    });

    this.serviceSuspensionRequest.getSuspensionRequestsById(this.userId).subscribe(async query => {
      this.suspensionRequests = query.data.suspensionRequestsByUserId;
      console.log(query);
    }, error => {
      console.log(error);
    });
  }

  updateSuspend(): void {
    this.serviceUser.updateAccountSuspension(this.userId).subscribe(async query => {
      // @ts-ignore
      if (query.data.updateAccountSuspension) {
        alert('Success');
      }
    });
  }
}
