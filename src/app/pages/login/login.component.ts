import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // VARIABLE DECLARATION
  errorBox;
  isError: boolean;
  errorMessage: string;
  isSuspend: boolean;

  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.isSuspend = false;
  }

  loginForm = this.formBuilder.group({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember_me: new FormControl(''),
  });

  tokenDetail: any;

  onSubmit(): void {
    // Process submitted data here
    const accountName = this.loginForm.value.account;
    const password = this.loginForm.value.password;
    const rememberMe = this.loginForm.value.remember_me;

    this.errorMessage = '';
    this.isError = false;
    if (this.loginForm.valid && rememberMe) {
      this.service.loginMutation(accountName, password).subscribe(async query => {
        if (query.data) {
          // Redirect to home
          await this.router.navigateByUrl('/');
        }
      }, async error => {
        this.errorMessage = error.toString();
        this.isError = true;
        if (this.errorMessage === 'Error: Account Suspended.') {
          // Suspended account
          this.isSuspend = true;
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
