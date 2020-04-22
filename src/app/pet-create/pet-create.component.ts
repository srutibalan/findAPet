import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PetService} from '../services/pet.service';
import {Pet} from '../models';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  petForm: FormGroup;
  petName: any;
  petType: any;
  petColor: any;
  gender: any;
  imageUrl: any;
  animalTypes = [];
  pet: Pet;
  genders = ['Male', 'Female'];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private petService: PetService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') != null) {
      const curr = JSON.parse(sessionStorage.getItem('currentUser'));
      if (curr.role !== 'ADMIN') {
        this.router.navigate(['/']);
      }
    }
    this.petForm = this.formBuilder.group({
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      petColor: ['', Validators.required],
      gender: [''],
      imageUrl: ['']
    });
    this.petService.getPetTypes().subscribe((data: any) => {
      console.log(data);
      this.animalTypes = data.types;
    });
  }

  OnSubmit() {
    this.petForm.markAllAsTouched();
    this.pet = {
      id: this.petForm.value.id,
      petName: this.petName,
      petType: this.petType.name,
      petColor: this.petColor,
      gender: this.gender,
      imageUrl: this.imageUrl
    };
    this.createPet();
  }
  private createPet(): void {
    this.petService.createPet(this.pet) // (this.petForm.value)
      .then(data => {
        if (data != null) {
          this.snackBar.open('created pet! ', 'Success!', {
            duration: 1000,
          });
          this.router.navigate(['/admin']);
          return;
        }
      }).catch(() => {
      this.snackBar.open('Unable to create Pet! ', 'Try again!', {
        duration: 1000,
      });
      this.router.navigate(['/']);
      return;
    });
  }

  /*
    onSelect($event: MatSelectChange) {
      this.petType = $event.value;
    }*/
}
