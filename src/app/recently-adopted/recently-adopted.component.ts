import {Component, OnInit} from '@angular/core';
import {AdoptionService} from '../services/adoption.service';
import {Adopt} from '../models/adopt';
import {PetFinderAnimalModel} from '../interfaces/pet-finder-animal-model';
import {PetService} from '../services/pet.service';

@Component({
  selector: 'app-recently-adopted',
  templateUrl: './recently-adopted.component.html',
  styleUrls: ['./recently-adopted.component.css']
})
export class RecentlyAdoptedComponent implements OnInit {

  adoptions: Adopt[];
  myMap: Map<Adopt, PetFinderAnimalModel>;

  constructor(private adoptService: AdoptionService, private  petService: PetService) {
    this.adoptService.findRecentAdoptions().then((async data => {
      const arr = [];
      let d: Adopt;
      const localMap = new Map<Adopt, PetFinderAnimalModel>();
      for (d of data) {
        //alert(JSON.stringify(d));
        arr.push(JSON.parse(JSON.stringify(d)));
        const response = await this.petService.getPet(Number(d.petId)).toPromise();
        localMap.set(JSON.parse(JSON.stringify(d)), response.animal);
      }
      this.adoptions = arr;
      this.myMap = localMap;
    }));
  }


  ngOnInit(): void {
  }

}
