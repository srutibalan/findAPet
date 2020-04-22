import {User} from './user';

export interface Adopt {
  petId: string;
  userDuplicateId: string;
  status: string;
  user: User;
}
