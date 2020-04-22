import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../models';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<any>(`api/auth`, { username: user.username, password: user.password })
      .pipe(map(loggedInUser => {
        // login successful if there's a jwt token in the response
        if (loggedInUser && loggedInUser.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          return false;
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
