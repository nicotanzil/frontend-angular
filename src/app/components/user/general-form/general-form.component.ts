import {Component, Input, OnInit, DoCheck, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {Country} from '../../../models/country';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {Query} from '../../../models/query';
import {UpdateUser} from '../../../models/user/update-user';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  countries: Country[];

  isSuccess: boolean;
  isError: boolean;

  constructor(
    private service: EditProfileService,
  ) {
    this.user = new User();
    this.currentUser = new UpdateUser(this.user);
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined || this.currentUser !== undefined) {
      this.currentUser = new UpdateUser(this.user);
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
}
