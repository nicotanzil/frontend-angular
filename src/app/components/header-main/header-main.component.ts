import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../models/current-user';
import {query} from '@angular/animations';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  @Input() isUser: boolean;
  @Input() user: User;

  constructor(
    private service: AuthService,
    private router: Router,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {

  }

  logout(): void {
    console.log('Logout');
    this.service.logout().subscribe();

    this.isUser = false;
    AuthService.isLoggedIn = false;

    this.router.navigateByUrl('/login');
  }
}
