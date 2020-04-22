import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Favorites} from '../models/favorites';
import {Observable} from 'rxjs';
import {User} from '../models';
import {SERVER_URL} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})


export class FavoriteService {


  constructor(private http: HttpClient) {
  }

  /*
    public findFavoritesByUserName = async (name) => (
      await fetch(API_URL + '/api/favorites/' + name).then(res => res.json()))*/
  // console.log(fetch(API_URL + '/api/favorites/' + name));


  /*  public findFavoritesByUserName(name: string) {
      const url = API_URL + '/api/favorites/' + name;
      alert(url);
      return (fetch(url));
    }*/
  public findFavoritesByUserName(name: string): Observable<{ favorite: Favorites }> {
    const url = SERVER_URL + '/api/favorites/' + name;
    return this.http.get<{ favorite: Favorites }>(url);
  }

  putFavorite = async (currUser: User, petid: number) => {
   // const json = '{"petId":' + petid + ', "user":' + currUser + '}';
    const obj = Object.create(null);
    obj.petId = petid;
    obj.user = currUser;
   // alert(obj.petId);
   // alert(obj.user);
    const response = await fetch(SERVER_URL + '/api/favorite', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    console.log(response);
   // return await response.json();
  }
}
