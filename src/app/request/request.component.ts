  import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FacilitatorService} from '../services/facilitator.service';
import {PetService} from '../services/pet.service';
import {PetFinderAnimalModel} from '../interfaces/pet-finder-animal-model';
import {Adopt} from '../models/adopt';
import {MatSnackBar} from '@angular/material/snack-bar';
import {element} from 'protractor';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  adoptionRequest: Adopt;
  pet: PetFinderAnimalModel;
  petId = '';
  userId = '';

  // @ts-ignore
  async constructor(private route: ActivatedRoute,
                    private service: FacilitatorService,
                    private petService: PetService,
                    private snackBar: MatSnackBar) {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore

    /*
        this.adoptService.findRecentAdoptions().then((async data => {
          const arr = [];
          let d: Adopt;
          const localMap = new Map<Adopt, PetFinderAnimalModel>();
          for (d of data) {
            alert(JSON.stringify(d));
            arr.push(JSON.parse(JSON.stringify(d)));
            const response = await this.petService.getPet(Number(d.petId)).toPromise();
            localMap.set(JSON.parse(JSON.stringify(d)), response.animal);*/
  }

  approveSnackBar() {
    this.snackBar.open('Adoption Request Approved!', 'Dismiss', {
      duration: 2000,
    });
  }

  declineSnackBar() {
    this.snackBar.open('Adoption Request Declined!', 'Dismiss', {
      duration: 2000,
    });
  }

  reload() {
    window.location.reload();
  }

  approve(petId, userId) {
    // tslint:disable-next-line:prefer-const
    let userIdNum = +userId;
    this.service.approveAdoption(petId, userIdNum).then();
  }

  decline(petId, userId) {
    // tslint:disable-next-line:prefer-const
    let userIdNum = +userId;
    this.service.declineAdoption(petId, userIdNum).then();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.petId = params.petId;
      this.userId = params.userId;
      this.service.findAdoptionRequest(this.petId, this.userId)
        .then((async adoptionRequest => {
          this.adoptionRequest = adoptionRequest;
          // tslint:disable-next-line:no-shadowed-variable
          const response = await this.petService.getPet(+this.adoptionRequest.petId).toPromise();
          this.pet = response.animal;
        }));
    });
  }


}
