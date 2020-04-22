import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from "../constants/constants";


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) {
  }

  findRecentAdoptions = () => fetch(SERVER_URL + '/api/recently_adopted',
    {mode: 'cors'}).then(response => response.json())

}
