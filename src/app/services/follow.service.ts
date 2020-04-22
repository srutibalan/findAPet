import {Injectable} from '@angular/core';
import {User} from '../models';
import {SERVER_URL} from "../constants/constants";

@Injectable()
export class FollowService {

  follow = async (currUser: User, followingId: number) => {
    const obj = Object.create(null);
    obj.follower = {};
    obj.followingId = followingId;
    obj.follower.id = currUser.id;
    const response = await fetch(SERVER_URL + '/api/following', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    console.log(response);
    // return await response.json();
  }

  getFollowingUsers = (userId: any) =>
    fetch(`${SERVER_URL}/api/followings_for_user/${userId}`, { mode: 'cors'})
      .then(response => response.json())

}
