import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
  ) { }

  // VARIABLE DECLARATION
  errorBox;
  isError: boolean;
  errorMessage: string;

  loginForm = this.formBuilder.group({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember_me: new FormControl(''),
  });

  token: string;

  onSubmit(): void {
    // Process submitted data here
    const profileName = this.loginForm.value.account;
    const password = this.loginForm.value.password;
    const rememberMe = this.loginForm.value.remember_me;

    this.errorMessage = '';
    this.isError = true;

    console.log('Profile Name: ' + profileName);
    console.log('Password: ' + password);

    if (this.loginForm.valid) {
      this.service.loginMutation(profileName, password).subscribe(async query => {
        if (query.data) {
          // @ts-ignore
          this.token = query.data.login;
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
