import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  private user: User;

  setUser = (user) => {
    this.user = user;
  }
  getUser = () => {
    return this.user;
  }

  extractUser = (token) => {
    // this.setUser(user);
    return null;
  }
}
