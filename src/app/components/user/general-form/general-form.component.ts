import {Component, Input, OnInit, DoCheck} from '@angular/core';
import {User} from '../../../models/user';
import {Country} from '../../../models/country';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {Query} from '../../../models/query';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit, DoCheck {

  constructor(
    private service: EditProfileService,
  ) { }

  @Input() user: User;
  currentUser: User;

  countries: Country[];

  isSuccess: boolean;
  isError: boolean;

  ngOnInit(): void {
    // Get countries list
    this.service.getCountries().subscribe(async query => {
      if (query.data) {
        this.countries = query.data.countries;
      }
    }, error => {
      console.log(error);
    });
  }

  ngDoCheck(): void {
    if (this.user.profileName === undefined || this.currentUser === undefined) {
      this.currentUser = this.user;
    }
  }

  onSave(): void {
    // Validation here
    // ...
    this.isError = false;
    this.isSuccess = false;
    // Mutation
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

  onCancel(): void {
    this.currentUser = this.user;
  }
}
