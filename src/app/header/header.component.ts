import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  title = 'Pet Finder';
  isLoggedIn$: Observable<boolean>;
  currentUser: User;
  searchText = '';
  isLogged: string;
  appMenu: any;

  constructor(private userService: UserService,
              private router: Router,
              private ref: ChangeDetectorRef) {
    if (sessionStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }
  }


  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.isLogged = '1';
    } else {
      // tslint:disable-next-line:new-parens
      this.currentUser = new User;
      this.isLogged = '0';
    }
    this.isLoggedIn$ = this.userService.isUserLoggedIn;
  }

  logout() {
    this.userService.logoutUser();
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.router.navigate(['/login']);
  }

  searchAnimals() {
    this.router.navigate(['/search/' + this.searchText]);
  }
}
