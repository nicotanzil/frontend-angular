import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recaptcha',
  templateUrl: "./recaptcha.component.html", 
  styleUrls: ['./recaptcha.component.scss'],
})
export class RecaptchaComponent implements OnInit {

  constructor() { }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  ngOnInit(): void {
  }

}
