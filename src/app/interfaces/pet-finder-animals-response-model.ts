import {PetFinderAnimalModel} from 'src/app/interfaces/pet-finder-animal-model';
import {PetFinderPaginationModel} from './pet-finder-pagination-model';

export interface PetFinderAnimalsResponseModel {
  animals: PetFinderAnimalModel[];
  pagination: PetFinderPaginationModel;
}

