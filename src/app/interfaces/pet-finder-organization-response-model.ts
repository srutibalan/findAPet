export interface PetFinderOrganizationResponseModel {
  organization: PetFinderOrganizationModel;
}
export interface PetFinderOrganizationModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  hours: Hours;
  url: string;
  website: string;
  mission_statement: string;
  adoption: Adoption;
  social_media: SocialMedia;
  photos?: (PhotosEntity)[] | null;
  distance?: null;
  _links: Links;
}
export interface Address {
  address1?: null;
  address2?: null;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
export interface Hours {
  monday?: null;
  tuesday?: null;
  wednesday?: null;
  thursday?: null;
  friday?: null;
  saturday?: null;
  sunday?: null;
}
export interface Adoption {
  policy: string;
  url?: null;
}
export interface SocialMedia {
  facebook: string;
  twitter?: null;
  youtube?: null;
  instagram: string;
  pinterest?: null;
}
export interface PhotosEntity {
  small: string;
  medium: string;
  large: string;
  full: string;
}
export interface Links {
  self: SelfOrAnimals;
  animals: SelfOrAnimals;
}
export interface SelfOrAnimals {
  href: string;
}
