import {Component, OnInit} from '@angular/core';
import {PetService} from '../services/pet.service';
import {UserService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';


export interface Card {
  name: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})


export class CustomerDetailsComponent implements OnInit {

  isUserLoggedIn: any;
  favoritePets: { name: '', description: '', type: '' }[];
  followingUsers: any;
  currentUser: {
    username: any;
    id: any;
    firstName: any;
    lastName: any;
  };
  adoptionRequests: any;

  adoptionObj: any;
  hideAdoptionRequests: boolean;

  constructor(private petService: PetService, private userService: UserService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.favoritePets = [];
    this.adoptionRequests = [];
    this.hideAdoptionRequests = true;
    // Check if user is logged in or not
    if (sessionStorage.getItem('currentUser') != null) {
      const curr = sessionStorage.getItem('currentUser');
      const currentUser = JSON.parse(curr);
      this.currentUser = currentUser;
      // Get the favorite pets
      this.userService.getFavoritePets(currentUser.id).then(response => {
        if (response != null || response !== undefined || response.length > 0) {

          for (let i = 0; i < response.length; i++) {
            // Get pet by ID
            this.petService.getPet(response[i])
              .subscribe((data: any) => {
                //console.log(data);
                // @ts-ignore
                this.favoritePets.push(data.animal);
              });
          }
        }
      });

      // Get following users
      this.userService.getFollowingUsers(currentUser.id).then(response => {
        this.followingUsers = response;
      });

      // Get the adoption requests of the logged in user
      this.userService.getAdoptionRequestsByUsername(currentUser.username).then(response => {
        const myArr = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < response.length; i++) {
          // Get pet by
          // alert((response[i].petId));
          this.petService.getPet(response[i].petId)
            .subscribe((data: any) => {
              this.hideAdoptionRequests = false;
              this.adoptionObj = {};
              // @ts-ignore
              this.adoptionObj = data.animal;
              this.adoptionObj.status = response[i].status;
              // @ts-ignore

              myArr.push(this.adoptionObj);
            });
        }
        this.adoptionRequests = myArr;
      });
    } else {
      // Redirect to login page
      this.router.navigate(['/login/']);
    }
  }

  removeFavorite(petId: any) {
    this.userService.removeFavorite(this.currentUser.id, petId).then(response => {
      alert('Pet removed successfully from favorites');
      this.userService.getFavoritePets(this.currentUser.id).then(response => {
        if (response != null || response !== undefined || response.length > 0) {
          this.favoritePets = [];
          for (let i = 0; i < response.length; i++) {
            // Get pet by ID
            this.petService.getPet(response[i])
              .subscribe((data: any) => {
                //console.log(data);
                // @ts-ignore
                this.favoritePets.push(data.animal);
              });
          }
        }
      });
    });
  }

  deleteAdoptionRequest(petId: any) {
    this.userService.deleteAdoptionRequest(this.currentUser.id, petId).then(
      response => {
        alert('Adoption request deleted successfully.');
        this.adoptionRequests = [];
        this.userService.getAdoptionRequestsByUsername(this.currentUser.username).then(response => {
          //alert('Adoption requests success');

          for (let i = 0; i < response.length; i++) {
            // Get pet by ID
            this.petService.getPet(response[i].petId)
              .subscribe((data: any) => {
                this.hideAdoptionRequests = false;
                this.adoptionObj = {};
                // @ts-ignore
                this.adoptionObj = data.animal;
                this.adoptionObj.status = response[i].status;
                // @ts-ignore
                this.adoptionRequests.push(this.adoptionObj);
              });
          }
        });
      }
    );
  }
}
