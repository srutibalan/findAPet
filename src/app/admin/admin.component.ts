import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Pet, User} from '../models';
import {UserService} from '../services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../services/pet.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  pets: Pet[] = [];
  isLoggedIn: Observable<boolean>;
  displayedColumns: string[] = ['name', 'role', 'actions'];
  displayedColumnsPets: string[] = ['name', 'gender', 'type', 'color', 'actions'];


  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private petService: PetService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser') != null) {
      this.isLoggedIn = new BehaviorSubject<boolean>(true);
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      // alert(this.currentUser.firstName);
    }
    if (this.currentUser.role === 'ADMIN') {
      this.loadAllUsers();
      this.loadAllPets();
      const lst = this.userService.findAllUsers();
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadAllUsers() {
    this.userService.findAllUsers().then(users => {
      this.users = users;
    }).catch(exp => {
    });
  }

  private loadAllPets() {
    this.petService.findAllPets().then(pets => {
      this.pets = pets;
    }).catch(exp => {
    });
  }

  deleteUser(user: any) {
    this.userService.deleteUserById(user).then(() => {
      this.loadAllUsers();
      this.snackBar.open('User deleted! ', 'Success!', {
        duration: 1000,
      });
      return;
    });
  }

  viewUser(user: User) {
    this.router.navigate(['/profile']);
  }

  deletePet(pet: any) {
    this.petService.deletePetById(pet).then(() => {
      this.loadAllPets();
      this.snackBar.open('Pet deleted! ', 'Success!', {
        duration: 1000,
      });
      return;
    });

  }
}
