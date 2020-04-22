import {Injectable} from '@angular/core';
import {User} from '../models';
import {SERVER_URL} from '../constants/constants';

@Injectable()
export class FacilitatorService {


  findAllAdoptionRequests = () =>
    fetch(`${SERVER_URL}/api/adoption_requests`)
      .then(response => response.json())

  findAdoptionRequest = (petId, userId) =>
    fetch(`${SERVER_URL}/api/adoption_request_info/${petId}/${userId}`)
      .then(response => response.json())

  approveAdoption = async (petId, userId) => {
    const response = await fetch(`${SERVER_URL}/api/approve_adoption/${petId}/${userId}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(''),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  declineAdoption = async (petId, userId) => {
    const response = await fetch(`${SERVER_URL}/api/decline_request/${petId}/${userId}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(''),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }


}
