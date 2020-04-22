import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  username: any;
  password: any;
  isLoggedIn: Observable<boolean>;
  currentUser: User;
   animalId: '';
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar,
              // tslint:disable-next-line:indent
	             private route: ActivatedRoute) { }

  ngOnInit() {

    if (sessionStorage.getItem('currentUser') != null) {
      this.router.navigate(['/']);
    }

      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.animalId = params.animalId;
    });
  }

  get data() { return this.loginForm.controls; }

  onSubmit() {
    this.isLoggedIn = new BehaviorSubject<boolean>(false); // this.userService.isUserLoggedIn;
    if (this.loginForm.invalid) {
      return;
    }
    const ab = this.userService.loginUser(this.loginForm.value)
      .then(data => {
        if (data != null) {
          // this.setUser(data);
          this.snackBar.open('Login Success! ', 'Success!', {
            duration: 100,
          });
          this.isLoggedIn = new BehaviorSubject<boolean>(true);

          if (this.animalId === '' || this.animalId === undefined ) {
            if (data.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (data.role === 'FACILITATOR') {
              this.router.navigate(['/facilitator']);
            } else {
                this.router.navigate(['/']);
              }
          } else {
            this.router.navigate(['/details/' + this.animalId]);
          }
          return;
        }
      })
      .catch( () => {
        this.snackBar.open('Check username and password! ', 'Try again!', {
          duration: 100,
        });
        this.username = '';
        this.password = '';
        this.router.navigate(['/login']);
      });
   }
}
