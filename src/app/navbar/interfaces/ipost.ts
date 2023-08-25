import { IProfile } from './profile';

export interface IPost {
  createdAt: string;
  text: string;
  updatedAt: string;
  user: IProfile;
  username: string;
  __v: number;
  _id: string;
}
