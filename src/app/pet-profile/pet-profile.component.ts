import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PetService} from '../services/pet.service';
import {Pet} from '../models';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {
petId: any;
pet: Pet;
petProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private petService: PetService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') != null) {
      const curr = JSON.parse(sessionStorage.getItem('currentUser'));
      if (curr.role !== 'ADMIN') {
        this.router.navigate(['/']);
      }
    }
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.petId = parseInt(params.petID);
    });

    this.petService.findPetById(this.petId)
      .then(async data => {
        this.pet = data;
        this.petProfileForm = this.formBuilder.group({
          id: [this.pet.id],
          petName: [this.pet.petName, Validators.required],
          petType: [this.pet.petType, Validators.required],
          petColor: [this.pet.petColor, Validators.required],
          gender: [this.pet.gender, Validators.required],
          imageUrl: [this.pet.imageUrl, Validators.required]
        });
      }).catch(() => {
      this.snackBar.open('Pet Profile not found', 'Try again!',{
        duration: 1000,
      });
      this.router.navigate(['/pet-profile', this.pet.id]);
      return;
    });
  }

  OnSubmit() {
    this.petProfileForm = this.formBuilder.group({
      id: [this.pet.id],
      petName: [this.pet.petName, Validators.required],
      petType: [this.pet.petType, Validators.required],
      petColor: [this.pet.petColor, Validators.required],
      gender: [this.pet.gender, Validators.required],
      imageUrl: [this.pet.imageUrl, Validators.required]
    });
    this.petService.updatePet(this.petProfileForm.value)
      .then(data => {
        if (data != null) {
          // if (sessionStorage.getItem('currentUser') != null) {
          this.snackBar.open('Pet Profile updated! ', 'Success!', {
            duration: 1000,
          });
          this.router.navigate(['/admin']);
          return;
        }
      }).catch(() => {
      this.snackBar.open('Profile NOT updated! check fields again ', 'Try Again!', {
        duration: 1000,
      });
      this.router.navigate(['/pet-profile', this.pet.id]);
      return;
    });
  }
}
