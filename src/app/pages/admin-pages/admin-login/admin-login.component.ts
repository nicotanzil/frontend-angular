import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  // VARIABLE DECLARATION
  errorBox;
  isError: boolean;
  errorMessage: string;

  loginForm = this.formBuilder.group({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    // Process submitted data here
    const accountName = this.loginForm.value.account;
    const password = this.loginForm.value.password;

    this.errorMessage = '';
    this.isError = false;
    if (this.loginForm.valid) {
      this.service.adminLoginMutation(accountName, password).subscribe(async query => {
        if (query.data) {
          // Redirect to home
          await this.router.navigateByUrl('/admin/games');
        }
      }, async error => {
        this.errorMessage = error.toString();
        this.isError = true;
      });
    }
  }

  ngOnInit(): void {
  }

}
