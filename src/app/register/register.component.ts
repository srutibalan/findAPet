import { Component, OnInit } from '@angular/core';
import {User} from '../models';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : {childrenNotEqual: true};
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 6 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  submitted = false;
  registerForm: FormGroup;
  username: any;
  address: any;
  phone: any;
  lastname: any;
  firstname: any;
  password: any;
  confirmpassword: any;
  email: any;
  isLoggedIn: Observable<boolean>;
  role: any;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  adoptionDetails = [];
  userId: any;
  adminLoggedIn: boolean;
  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') !== 'null') {
      const cur = JSON.parse(sessionStorage.getItem('currentUser'));
      if (cur === null) {
        // do nothing
      } else {
        if (cur.role === 'ADMIN') {
          // this.router.navigate(['/admin']);
        } else if (cur.role === 'FACILITATOR') {
          this.router.navigate(['/facilitator']);
        } else if (cur.role === 'ADOPTER') {
          this.router.navigate(['/']);
        }
      }
      this.route.params.subscribe(params => {
        this.userId = params.Id;
      });
      if (sessionStorage.getItem('currentUser') === null) { // || this.userId === '' || this.userId === undefined){
        this.adminLoggedIn = false;
      } else {
        const curr = JSON.parse(sessionStorage.getItem('currentUser'));
        this.userService.findUserById(curr.id)
          .then(data => {
            if (data.role === 'ADMIN') {
              this.adminLoggedIn = true;
              return;
            } else {
              this.adminLoggedIn = false;
            }
          });
      }
      this.isLoggedIn = this.userService.isUserLoggedIn;
      this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(1),
          Validators.maxLength(128)]],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        role: ['', Validators.required],
        passwordGroup: this.formBuilder.group({
          password: ['', [
            Validators.required,
            Validators.pattern(regExps.password)
          ]],
          confirmPassword: ['', Validators.required]
        }, {validator: CustomValidators.childrenEqual})
      });
    }
  }

  passwordMatchValidator(password, confirmPassword){
    if (password !== confirmPassword) {
      console.log('confirm password doesn\'t match!');
    }
  }

  get data() { return this.registerForm.controls; }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.user = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: '',
        lastUpdated: '',
        adoptionDetails: []
       // confirmPassword: ''
      };
    }
  }
  OnSubmit() {
    this.registerForm.markAllAsTouched();

    this.passwordMatchValidator(this.password, this.confirmpassword);
    this.passwordMatchValidator(this.password, this.confirmpassword);

    this.isLoggedIn = new BehaviorSubject<boolean>(false); // this.userService.isUserLoggedIn;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.user = {
      id: '',
      username: this.username,
      password: this.password,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      role: this.role,
      lastUpdated: new Date().getTime(),
      adoptionDetails: this.adoptionDetails
    };
    const userAvailability = this.userService.findUsernameAvailability(this.registerForm.value.username)
      .then(data => {
        if (!data) {
          this.registerUser();
        } else {
          this.username = '';
          this.snackBar.open('Username: ' + this.registerForm.value.username + ' already present', 'Try Again!', {
            duration: 100,
          });
        }
      });
  }
  private registerUser(): void {
    this.userService.registerUser(this.user)
      .then(data => {
        if (data != null) {
          this.snackBar.open('Registered user! ', 'Success!', {
            duration: 100,
          });
          this.router.navigate(['/login']);
          return;
        }
      }).catch(() => {
      this.snackBar.open('User not registered, check the fields! ', 'Try again!', {
        duration: 100,
      });
      this.router.navigate(['/']);
      return;
    });
  }
}
