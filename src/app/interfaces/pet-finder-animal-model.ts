export interface PetFinderAnimalModel {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: string;
  gender: string;
  size: string;
  coat?: null;
  attributes: Attributes;
  environment: Environment;
  tags?: (string)[] | null;
  name: string;
  description: string;
  photos?: (PhotosEntity)[] | null;
  videos?: (VideosEntity)[] | null;
  status: string;
  status_changed_at: string;
  published_at: string;
  distance: number;
  contact: Contact;
  _links: Links;
}
export interface Breeds {
  primary: string;
  secondary?: string;
  mixed: boolean;
  unknown: boolean;
}
export interface Colors {
  primary?: null;
  secondary?: null;
  tertiary?: null;
}
export interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed?: null;
  special_needs: boolean;
  shots_current: boolean;
}
export interface Environment {
  children: boolean;
  dogs: boolean;
  cats: boolean;
}
export interface PhotosEntity {
  small: string;
  medium: string;
  large: string;
  full: string;
}
export interface VideosEntity {
  embed: string;
}
export interface Contact {
  email: string;
  phone: string;
  address: Address;
}
export interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
export interface Links {
  self: SelfOrTypeOrOrganization;
  type: SelfOrTypeOrOrganization;
  organization: SelfOrTypeOrOrganization;
}
export interface SelfOrTypeOrOrganization {
  href: string;
}
