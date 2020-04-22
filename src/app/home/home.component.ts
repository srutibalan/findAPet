import {Component, OnInit} from '@angular/core';
import {PetService} from '../services/pet.service';
import {PetFinderAnimalsResponseModel} from '../interfaces/pet-finder-animals-response-model';
import {FavoriteService} from '../services/favorite.service';
import {UserService} from '../services';
import {User} from '../models';
import {Observable} from 'rxjs';
import {FollowService} from '../services/follow.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets: any;
  user: any;
  count = 0;
  isUserLoggedIn = false;
  userId: any;
  firstName = '';
  favoritePetsIds: string[];
  favoritePets: any;
  followingUsers: User[];
  lastUsers: User[];
  isLoggedIn: Observable<boolean>;

  constructor(private petService: PetService,
              private favService: FavoriteService,
              private userService: UserService,
              private followService: FollowService,
              private route: Router) {
   // this.lastUsers = [];
    this.favoritePets = [];
    this.favoritePetsIds = [];
    this.userService.findFiveUsers().then((data => {
      const arr = [];
      let d: User;
      for (d of data) {
        arr.push(JSON.parse(JSON.stringify(d)));
      }
      this.lastUsers = arr;
    }));
    this.petService.getPets().subscribe((data: PetFinderAnimalsResponseModel) => {
      this.extractPets(data);
      const k = data.pagination;
    });
    if (sessionStorage.getItem('currentUser') != null) {
      this.setFirstNameFavorites();
      this.setFirstNameFollowing();
    }

  }

  private setFirstNameFavorites() {
    const curr = sessionStorage.getItem('currentUser');
    this.isUserLoggedIn = true;
    const currentUser = JSON.parse(curr);
    this.firstName = currentUser.firstName;
    const name = currentUser.id;
    this.favService.findFavoritesByUserName(name).subscribe(res => {
      this.favoritePetsIds = res.toString().split(',');
      if (this.favoritePetsIds.length > 0) {
        this.eventChange(this.favoritePetsIds);
      }
    });
  }

  private async setFirstNameFollowing() {
    const curr = sessionStorage.getItem('currentUser');
    this.isUserLoggedIn = true;
    const currentUser = JSON.parse(curr);
    this.userId = currentUser.id;
    const name = currentUser.id;
    this.followingUsers = await this.followService.getFollowingUsers(this.userId);
  }

  private async eventChange(petids) {
    let id;
    const myArray = [];
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const ul = Array.from(new Set(petids));

    for (id of ul) {
      const response = await this.petService.getPet(id).toPromise();
      if (response.animal != undefined) {
        myArray.push(response.animal);
        this.favoritePets = myArray;
      }
    }
  }

  private extractPets(data: PetFinderAnimalsResponseModel) {
    const k = data.animals;
    const array = k.splice(0, 99);
    let pet;
    const myArray = [];
    for (pet of array) {
      if (this.count === 4) {
        break;
      }
      if (pet.photos.length > 0) {
        if (pet.photos[0].medium) {
          myArray.push(pet);
          this.count++;
        }
      }
    }
    this.pets = myArray.slice(0, 4);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isUserLoggedIn;

  }

  onclick(petId: number) {
    this.isLoggedIn = this.userService.isUserLoggedIn;
    if (this.isUserLoggedIn) {
      const curr = sessionStorage.getItem('currentUser');
      const currentUser = JSON.parse(curr);
      this.favService.putFavorite(currentUser, petId);
      this.reload();
    } else {
      this.route.navigate(['/login']);
    }
  }

  follow(followerId: number) {
    this.isLoggedIn = this.userService.isUserLoggedIn;
    if (this.isUserLoggedIn) {
      const curr = sessionStorage.getItem('currentUser');
      const currentUser = JSON.parse(curr);
      this.followService.follow(currentUser, followerId);
      this.reload();
    } else {
      this.route.navigate(['/login']);
    }
  }

  removeFavorite(petId: any) {
    this.userService.removeFavorite(this.userId, petId).then(k => {
      alert('Pet removed successfully from favorites');
      this.userService.getFavoritePets(this.userId).then(response => {
        if (response != null || response !== undefined || response.length > 0) {
          this.favoritePets = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < response.length; i++) {
            // Get pet by ID
            this.petService.getPet(response[i])
              .subscribe((data: any) => {
                // @ts-ignore
                this.favoritePets.push(data.animal);
              });
          }
        }
      });
    });
  }

  reload() {
    window.location.reload();
  }
}
