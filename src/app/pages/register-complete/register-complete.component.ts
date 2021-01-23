import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.scss']
})
export class RegisterCompleteComponent implements OnInit {

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder,
  ) { }

  errorBox;
  isError: boolean;
  errorMessage: string;

  successBox;
  isSuccess: boolean;
  successMessage: string;

  registerMainForm = this.formBuilder.group({
    account: '',
    password: '',
    confirm: '',
    otp: '',
  });

  onSubmit(): void {
    const account = this.registerMainForm.value.account;
    const password = this.registerMainForm.value.password;
    const confirm = this.registerMainForm.value.confirm;
    const otp = this.registerMainForm.value.otp;

    this.errorMessage = '';
    this.isError = true;

    this.successMessage = '';
    this.isSuccess = false;

    // Validate account name is taken
    // validate password is not the same
    if (account === undefined || password === undefined || confirm === undefined || otp === undefined) {
      this.changeError('Please fill all fields.\n');
      return;
    }
    else if (password !== confirm) {
      this.changeError('Please enter the same password in both password fields.\n');
      return;
    }
    // send inputted otp.code, account, password to server -> server return User obj
    let email;
    let countryName;

    this.service.getOtpByCode(otp).subscribe(async query => {
      this.isError = false;
      this.isSuccess = false;
      const data = query.data.getOtpByCode;
      email = data.email;
      countryName = data.countryName;
      if (email === '') {
        this.changeError('Invalid OTP');
      }
      else {
        this.addUser(account, password, email, countryName);
      }
    }, error => {
      console.log('There has been an error ', error);
      this.changeError('Invalid OTP');
    });
  }

  addUser(account, password, email, countryName): void {
    this.service.createUser(account, password, email, countryName).subscribe(async query => {
      if (query.data) { this.successMessage = 'Account ' + account + ' successfully created.\n'; this.isSuccess = true;}
      else { this.errorMessage = 'Creating user fail. Invalid data'; this.isError = true; }
    }, error => {
      console.log('There has been an error ', error);
    });

  }

  changeError(error): void {
    this.isError = true;
    this.errorMessage = error;
  }

  ngOnInit(): void {
  }

}
