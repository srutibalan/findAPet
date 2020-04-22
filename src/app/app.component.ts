import {Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './services';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PetFinder';
  isLoggedIn$: Observable<boolean>;
  currentUserSubscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    if (sessionStorage.getItem('currentUser') != null) {
      // alert(this.userService.isUserLoggedIn.subscribe());
       this.isLoggedIn$ = new BehaviorSubject<boolean>(true);
    } else {
      this.isLoggedIn$ = new BehaviorSubject<boolean>(true);
    }
    this.matIconRegistry.addSvgIcon(
      `pet_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/catdog.svg'));
  }
  OnDestroy() {
    this.currentUserSubscription.unsubscribe();
    if (sessionStorage.getItem('currentUser') != null) {
      this.userService.logoutUser();
    }
  }
}
