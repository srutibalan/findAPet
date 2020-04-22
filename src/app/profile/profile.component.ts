import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services';
import {User} from '../models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable} from 'rxjs';
import {PetService} from '../services/pet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: any;
  profileForm: FormGroup;
  user: User;
  currentUser: User;
  isLoggedIn: Observable<boolean>;
  otherUser: User;
  myProfile: boolean;
  adminloggedIn: boolean;
  pets: any;
  displayPets: any;

  @Input() message: User;
  userId: any;
  showMoreDetails: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private petService: PetService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isUserLoggedIn; // new BehaviorSubject<boolean>(true);
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.userId = parseInt(params.userId);
      this.showMoreDetails = false;
    });
    const curr = JSON.parse(sessionStorage.getItem('currentUser'));
        if (curr === null) {
      this.router.navigate(['/']);
    }

    this.currentUser = curr;
    if (this.userId === '' || this.userId === undefined || isNaN(this.userId)) {
      this.userId = curr.id;
      this.myProfile = true;
      this.showMoreDetails = true;
    }
    if (curr.role === 'ADMIN') {
      this.adminloggedIn = true;
    }
    this.userService.findUserById(this.userId)
      .then(async data => {
        this.otherUser = data;
        this.profileForm = this.formBuilder.group({
          id: [this.otherUser.id],
          username: [this.otherUser.username, Validators.required],
          password: [this.otherUser.password, Validators.required],
          firstName: [this.otherUser.firstName, Validators.required],
          lastName: [this.otherUser.lastName, Validators.required],
          phone: [this.otherUser.phone, Validators.required],
          address: [this.otherUser.address, Validators.required],
          email: [this.otherUser.email, Validators.required],
          role: [this.otherUser.role, Validators.required],
          adoptionDetails: [this.otherUser.adoptionDetails, Validators.required]
        });
        this.pets = this.profileForm.value.adoptionDetails;
        this.eventChange(this.pets);
        /*const myArray = [];
        for (const pet of this.pets) {
          // tslint:disable-next-line:radix
          const ab = this.petService.getPet(parseInt(pet.petId));
          // tslint:disable-next-line:radix
          const response = await this.petService.getPet(parseInt(pet.petId)).toPromise();
          alert(response.animal.name);
          myArray.push(response.animal.name);
        }
        this.displayPets = myArray;*/
      }).catch(() => {
      this.snackBar.open('Profile not found', 'Try again!', {
        duration: 1000,
      });
      this.router.navigate(['/profile', this.otherUser.id]);
      return;
    });
    // if (sessionStorage.getItem('currentUser') != null) {
    /*   const curr = sessionStorage.getItem('currentUser');
       this.currentUser = JSON.parse(curr);*/
    // }
  }

  private async eventChange(pets) {
    let pet;
    const myArray = [];
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    for (pet of pets) {
      // tslint:disable-next-line:radix
      const response = await this.petService.getPet(parseInt(pet.petId)).toPromise();
      myArray.push(response.animal.name);
    }
    this.displayPets = myArray;
  }

  OnSubmit() {
    // if (sessionStorage.getItem('currentUser') != null) {
    this.profileForm = this.formBuilder.group({
      id: [this.otherUser.id],
      username: [this.otherUser.username, Validators.required],
      firstName: [this.otherUser.firstName, Validators.required],
      lastName: [this.otherUser.lastName, Validators.required],
      password: [this.otherUser.password],
      phone: [this.otherUser.phone, Validators.required],
      address: [this.otherUser.address, Validators.required],
      email: [this.otherUser.email, Validators.required],
      role: [this.otherUser.role, Validators.required],
      adoptionDetails: [this.otherUser.adoptionDetails, Validators.required]
    });
    this.userService.updateUser(this.profileForm.value)
      .then(data => {
        if (data != null) {
          // if (sessionStorage.getItem('currentUser') != null) {
          this.snackBar.open('Profile updated! ', 'Success!', {
            duration: 1000,
          });
          if (sessionStorage.getItem('currentUser') != null){
            const curr = JSON.parse(sessionStorage.getItem('currentUser'));
            this.currentUser = curr;
            if (curr.role === 'ADMIN') {
              this.router.navigate(['/admin']);
              return;
            } else if (curr.role === 'ADOPTER') {
              this.router.navigate(['/']);
              return;
            } else if (curr.role === 'FACILITATOR') {
              this.router.navigate(['/facilitator']);
              return;
            }
          }
          return;
        }
      }).catch(() => {
      this.snackBar.open('Profile NOT updated! check fields again ', 'Try Again!', {
        duration: 1000,
      });
      this.router.navigate(['/profile', this.otherUser.id]);
      return;
    });
    // }
  }}
