import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

import { Country } from 'src/app/models/country';
import { RegisterService } from 'src/app/services/register.service';
import { RecaptchaComponent } from 'src/app/components/recaptcha/recaptcha.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder,
  ) { }
  // VARIABLE DECLARATION
  countries: Country[];
  selectedCountry;

  errorBox;
  isError: boolean;
  errorMessage: string;

  successBox;
  isSuccess: boolean;
  successMessage: string;

  registerMainForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    captcha: new FormControl(''),
    agreement: new FormControl(''),
  });


  changeSelect = () => {
    console.log(this.selectedCountry);
  }

  onSubmit(): void {
    // Process submitted data here
    const email = this.registerMainForm.value.email;
    const confirmEmail = this.registerMainForm.value.confirm;
    const country = this.registerMainForm.value.country;
    const captcha = this.registerMainForm.value.captcha;
    const agree = this.registerMainForm.value.agreement;

    this.errorMessage = '';
    this.isError = true;

    // FrontEnd validation
    if (!this.validateEmail(email)) {
      this.errorMessage = 'Please enter a valid email address.\n ';
    }
    else if (email !== confirmEmail) {
      this.errorMessage = 'Please enter the same address in both email address fields.\n';
    }
    else if (country === undefined) {
      this.errorMessage = 'Please select a country.\n';
    }
    else if (RecaptchaComponent.response === undefined) {
      this.errorMessage = 'Please verify recaptcha.\n';
    }
    else if (!agree) {
      console.log(country);
      console.log(RecaptchaComponent.response);
      this.errorMessage = 'Please agree to the terms.\n';
    }
    else {
      // Success
      console.log('Success ', email, ' ', country);
      this.isError = false;
      // Generate OTP
      this.service.generateOtp(email, country).subscribe(async (query) => {
        if (query.data) { this.successMessage = 'OTP has been sent to ' + email + '. \nPlease check your inbox.'; this.isSuccess = true; }
        else { this.errorMessage = 'Generating OTP Fail'; this.isError = true; }
      }, (error) => {
        console.log('There has been an error: ', error);
      });
    }
  }

  ngOnInit(): void {
    this.isError = false;
    // Get countries for combobox
    this.service.getCountries().subscribe(async query => {
      if (query.data) { this.countries = query.data.countries; }
      else { this.errorMessage = 'Fetching countries data fail'; this.isError = true; }
    });

  }

  validateEmail = email => {
    const regexp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return regexp.test(String(email).toLowerCase());
  }
}
