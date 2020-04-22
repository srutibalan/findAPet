import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PetFinderAnimalModel} from 'src/app/interfaces/pet-finder-animal-model';
import {PetFinderAnimalsResponseModel} from '../interfaces/pet-finder-animals-response-model';
import {PAGINATION_SETTINGS} from '../constants/settings/pagination.settings';
import {PetFinderOrganizationModel, PetFinderOrganizationResponseModel} from '../interfaces/pet-finder-organization-response-model';
import {map} from 'rxjs/operators';
import {Pet} from '../models';
import {SERVER_URL} from "../constants/constants";
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly BASE_URL = 'https://api.petfinder.com';
  private readonly apiVersion = 'v2';

  constructor(private http: HttpClient) {
  }

  createPet = async (pet: Pet) => {
    const response = await fetch(`${SERVER_URL}/api/pet`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(pet),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    return response;
  }
  updatePet = async (pet: Pet) => {
    const response = await fetch(`${SERVER_URL}/api/updatePet/${pet.id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(pet),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    return response;
  }
  deletePetById = async (pet: Pet) => {
    const response = await fetch(`${SERVER_URL}/api/delete_pet/${pet.id}`, {
      method: 'DELETE',
    })
    return response;
  }
  findAllPets = () =>
    fetch(`${SERVER_URL}/api/pets`, {mode: 'cors'})
    // fetch('https://wbdv-generic-server.herokuapp.com/api/001373567/courses')
      .then(response => response.json())
  findPetById = (id) =>
    fetch(`${SERVER_URL}/api/pet/${id}`, { mode: 'cors'})
      .then(response => response.json())


  public getPets(): Observable<PetFinderAnimalsResponseModel> {
    const url = `${this.BASE_URL}/${this.apiVersion}/animals`;
    //  alert(url);
    return this.http.get<PetFinderAnimalsResponseModel>(url);
  }

  public getPet(id: number): Observable<{ animal: PetFinderAnimalModel }> {
    const url = `${this.BASE_URL}/${this.apiVersion}/animals/${id}`;
    // alert(url);
    return this.http.get<{ animal: PetFinderAnimalModel }>(url);
  }

  public getResultsPage(page: string): Observable<PetFinderAnimalsResponseModel> {
    const url = `${this.BASE_URL}${page}`;
    return this.http.get<PetFinderAnimalsResponseModel>(url);
  }

  public getOrganization(orgId: string): Observable<PetFinderOrganizationModel> { // TODO: Type
    const url = `${this.BASE_URL}/${this.apiVersion}/organizations/${orgId}`;
    return this.http.get<PetFinderOrganizationResponseModel>(url).pipe(
      map(response => response.organization)
    );
  }

  public getImage(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getPetTypes(): Observable<{animals: PetFinderAnimalsResponseModel}> {
    const url = `${this.BASE_URL}/${this.apiVersion}/types`;
    return this.http.get<{animals: PetFinderAnimalsResponseModel}>(url);
  }
  public getPetsByType(animalType: string): Observable<PetFinderAnimalsResponseModel> {
    // alert(animalType);
    const url = `${this.BASE_URL}/${this.apiVersion}/animals`;
    const httpOptions = {
      params: new HttpParams()
        .set('type', animalType)
        .set('limit', '100' ) // `${PAGINATION_SETTINGS.pageSize}`
    };

    return this.http.get<PetFinderAnimalsResponseModel>(url, httpOptions);
  }

  public advanceSearch(animalType: string, animalColor: string, gender: string): Observable<PetFinderAnimalsResponseModel> {
    // alert(animalType);
    const url = `${this.BASE_URL}/${this.apiVersion}/animals`;
    const httpOptions = {
      params: new HttpParams()
        .set('type', animalType)
      .set('color', animalColor)
        .set('gender' , gender)
        .set('limit', '100' ) // `${PAGINATION_SETTINGS.pageSize}`
    };

    return this.http.get<PetFinderAnimalsResponseModel>(url, httpOptions);
  }
}
