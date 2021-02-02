import {Component, Input, OnInit, DoCheck} from '@angular/core';
import {User} from '../../../models/user';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {EditProfileService} from '../../../services/user/edit-profile.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss']
})
export class GeneralFormComponent implements OnInit, DoCheck {

  constructor(
    private formBuilder: FormBuilder,
    private service: EditProfileService,
  ) { }

  @Input() user: User;
  profileName: string;
  realName: string;
  customUrl: string;

  countries: Country[];
  selectedCountry;
  countryId;

  generalForm = this.formBuilder.group({
    profileName: new FormControl('', [Validators.required]),
    realName: new FormControl('', [Validators.required]),
    customUrl: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

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

  onSubmit(): void {
    console.log(this.user.profileName);
    console.log(this.user);
  }

  ngDoCheck(): void {
    this.profileName = this.user.profileName;
    this.realName = this.user.realName;
    this.customUrl = this.user.customUrl;
    this.generalForm.value.profileName = this.user.profileName;
    this.generalForm.value.realName = this.user.realName;
    this.generalForm.value.customUrl = this.user.customUrl;
    this.generalForm.value.country = this.user.country;
  }
}
