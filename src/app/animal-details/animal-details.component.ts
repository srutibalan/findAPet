import {Component, OnInit, ViewChild} from '@angular/core';
import {PetService} from '../services/pet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services';
import {any} from 'codelyzer/util/function';
import {PetFinderAnimalModel} from '../interfaces/pet-finder-animal-model';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  constructor(private petService: PetService, private userService: UserService, private router: Router,
              private route: ActivatedRoute) {
  }

  animalId = 0;
  /*  animal: {
      contact: any;
      status: any;
      tags: any;
      attributes: any;
      gender: any;
      age: any;
      colors: any;
      breeds: any;
      species: any;
      name: any;
      photos: [{ medium: any }];
      id: any;
    };*/
  currentUser = {
    id: any
  };
  animal: PetFinderAnimalModel;
  adopted: boolean;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;
  staticAlertClosed: boolean;

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') != null) {
      const curr = sessionStorage.getItem('currentUser');
      this.currentUser = JSON.parse(curr);
      console.log('User :' + this.currentUser);
    }
    this.route.params.subscribe(params => {
      this.animalId = params.animalId;
      this.petService
        .getPet(this.animalId)
        .subscribe(animal => {
          console.log(animal);
          // @ts-ignore
          this.animal = animal.animal;
        });
    });
  }

  adoptAnimal() {
    this.staticAlertClosed = true;
    if (sessionStorage.getItem('currentUser') != null) {
      const adoptionObj = {
        petId: this.animal.id,
        user: {
          id:  this.currentUser.id
        }
      };
      this.userService.createAdoption(adoptionObj)
        .then(response => {
            this.adopted = true;
            this.router.navigate(['/customer/details']);
          }
          , err => alert('Error :' + err));
    } else {
      // Redirect to login page
      this.router.navigate(['/login/' + this.animal.id]);
    }


  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
