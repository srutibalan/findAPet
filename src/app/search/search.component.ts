import { Component, OnInit } from '@angular/core';
import {PetService} from '../services/pet.service';

import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FavoriteService, UserService} from '../services';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  colors: any[];
  private searchFromQuery: any;
  private isLoggedIn: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private petService: PetService, private route: ActivatedRoute,
              private favoriteService: FavoriteService, private userService: UserService, private router: Router) {
  }

  testing = '';
  animals = [];
  animalTypes = [];
  searchTxt = '';
  searchForm = this.formBuilder.group({
    selectFormPetType: [null, Validators.required],
    selectFormColor: [null, Validators.required],
    selectFormGender: [null, Validators.required]
  });
  Genders: ['Male', 'Female', 'Any'];

  animal = {
    id: '',
    name: '',
    type: '',
    description: '',
    gender: '',
    species: '',
    breeds: {primary: ''},
    colors: {primary: ''},
    photos: [{medium: ''}]
  };

  selectedType = { colors : [] , name: ''};
  selectedColor: any;
  selectedGender: any;
  emptyType: { colors: [], name: '' };
  emptyColor = {};
  myControl: any;

  ngOnInit(): void {
    this.testing = 'Testing';
    this.route.params.subscribe(params => {
      // alert(params.animalId);
      this.searchTxt = params.searchText;
      this.searchAnimals();
    });
    this.selectedType = this.emptyType;
    this.selectedColor = this.emptyColor;
    this.selectedGender = 'Male';
    this.petService.getPetTypes().subscribe((data: any) => {
      console.log(data);
      this.animalTypes = data.types;
    });
    }

  changeType(ob) {
    const selectedBook = ob.value;
    this.colors = this.selectedType.colors;
  }

  searchAnimals() {
    this.animals = [];
    this.petService.getPetsByType(this.searchTxt).subscribe( (data: any) => {
      this.animals = data.animals;

    });
  }

  advancedSearch() {
    this.petService.advanceSearch(this.selectedType.name, this.selectedColor, this.selectedGender).subscribe((data: any) => {
      this.animals = [];
      this.animals = (data.animals);
    });
  }

  resetSearch() {
    this.selectedType = this.emptyType;
    this.selectedColor = this.emptyColor;
    this.selectedGender = 'Male';
    this.animals = [];
  }


  onclick(petId: number) {
    this.isLoggedIn = this.userService.isUserLoggedIn;
    if (this.isLoggedIn) {
      const curr = sessionStorage.getItem('currentUser');
      const currentUser = JSON.parse(curr);
      this.favoriteService.putFavorite(currentUser, petId);
      alert('You have added this pet as your favorite!');
      this.reload();
    } else {
      this.router.navigate(['/login']);
    }
  }

  reload() {
    window.location.reload();
  }
}
