import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {SERVER_URL} from '../constants/constants';


@Injectable()
export class UserService {
  public currentUser: Observable<User>;
 /* public otherUser: Observable<User>;*/
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  createAdoption = async (adoption) => {
    // alert(adoption);
    // debugger;
    const response = await fetch(`${SERVER_URL}/api/adoption`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(adoption),
      headers: {
        'content-type': 'application/json'
      }
    });
    return await response.json();
  }

  getFavoritePets = (userId) =>
    fetch(`${SERVER_URL}/api/favorites/${userId}`, { mode: 'cors'})
      .then(response => response.json())

  getFollowingUsers = (userId) =>
    fetch(`${SERVER_URL}/api/followings_for_user/${userId}`, { mode: 'cors'})
      .then(response => response.json())

  getAdoptionRequestsByUsername = (userName) =>
    fetch(`${SERVER_URL}/api/all_adoption_requests/${userName}`, { mode: 'cors'})
      .then(response => response.json())

  removeFavorite = async (userId, petId) => {
    const response = await fetch(`${SERVER_URL}/api/delete_favourite/${userId}/${petId}`, {
      method: 'DELETE'
    })
    return response;
  }

  deleteAdoptionRequest = async (userId, petId) => {
    const response = await fetch(`${SERVER_URL}/api/delete_adoption/${userId}/${petId}`, {
      method: 'DELETE'
    })
    return response;
  }
  // -------------------------------------


   registerUser = async (user: User) => {
   const response = await fetch(`${SERVER_URL}/api/user`, {
     mode: 'cors',
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
       'content-type': 'application/json'
     }
   }).then(res => res.json());
   return response;
  }

  findUsernameAvailability = (username) =>
    fetch(`${SERVER_URL}/api/usernameAvailability/${username}`, { mode: 'cors'})
      .then(response => response.json())

  loginUser = async (user: User) => {
    const response = await fetch(`${SERVER_URL}/api/auth`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    sessionStorage.setItem('currentUser', JSON.stringify(response));
    this.loggedIn.next(true);
    return response;
  }
  logoutUser() {
    sessionStorage.removeItem('currentUser');
    const name = JSON.parse(sessionStorage.getItem('currentUser'));
    // alert('logout: ' + name);
    // localStorage.removeItem('currentUser');
  }
  /*get otherUserDetails() {
    return this.otherUser;
  }*/
  get isUserLoggedIn() {
   /* if (sessionStorage.getItem('currentUser') != null) {
      return new BehaviorSubject<boolean>(true);
    } else {
      return new BehaviorSubject<boolean>(false);
    }*/
   return this.loggedIn.asObservable();
  }
  updateUser = async (user: User) => {
    const response = await fetch(`${SERVER_URL}/api/updateUser/${user.id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    const curr = JSON.parse(sessionStorage.getItem('currentUser'))
    if (user.id === curr.id) {
      sessionStorage.setItem('currentUser', JSON.stringify(response));
    }
    return response;
  }
  deleteUserById = async (user: User) => {
    const response = await fetch(`${SERVER_URL}/api/delete_user/${user.id}`, {
      // mode: 'no-cors',
      method: 'DELETE',
      // body: JSON.stringify(user),
      /*headers: {
        'content-type': 'application/json'
      }*/
    })
    // sessionStorage.setItem('currentUser', JSON.stringify(response));
    return response;
  }
  /*deleteUserById = (user: User) =>
    fetch(`http://localhost:3000/api/delete_user/${user.id}`, {
      method: 'delete'
    })*/
 /* deleteUserById = (id) =>
    fetch('http://localhost:8080/api/delete_user/' + id, { mode: 'cors'})
      .then(response => response.json())*/
  findUserById = (id) =>
    fetch(`${SERVER_URL}/api/user/${id}`, { mode: 'cors'})
        .then(response => response.json())

  verifyUser = async (username, password) => {
    const response = await fetch(`${SERVER_URL}/api/credentials/${username}/${password}`, {mode: 'cors'})
      .then(res => res.json());
    console.log(response);
    return response;
  }

  findAllUsers = () =>
    fetch(`${SERVER_URL}/api/users`, {mode: 'cors'})
    // fetch('https://wbdv-generic-server.herokuapp.com/api/001373567/courses')
      .then(response => response.json())

  findFiveUsers = () => fetch(SERVER_URL
    + '/api/last_updated_users', {mode: 'cors'}).then(response => response.json());

}
