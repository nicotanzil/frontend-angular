import { Component, OnInit } from '@angular/core';
import {InputUser} from '../../../models/input/input-user';
import {InputSuspensionRequest} from '../../../models/input/input-suspension-request';
import {SuspensionRequestService} from '../../../services/suspension-request.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-suspension-request',
  templateUrl: './suspension-request.component.html',
  styleUrls: ['./suspension-request.component.scss']
})
export class SuspensionRequestComponent implements OnInit {

  accountName: string;
  description: string;
  accountId: number;
  inputUser: InputUser;
  request: InputSuspensionRequest;

  constructor(
    private requestService: SuspensionRequestService,
    private userService: UserService,
  ) {
    this.request = new InputSuspensionRequest();
    this.inputUser = new InputUser();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.getUserByAccountName(this.accountName).subscribe(async query => {
      this.accountId = query.data.getUseByAccountName.id;
      this.inputUser.id = this.accountId;
      this.request.user = this.inputUser;
      this.request.description = this.description;
      this.requestService.createSuspensionRequest(this.request).subscribe(async res => {
        alert(`Unsuspend request for ${this.accountName} sent! `);
      }, error => {
        console.log(error);
      });
    });
  }

}
