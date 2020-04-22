import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {AdminComponent} from './admin/admin.component';
import {AnimalDetailsComponent} from './animal-details/animal-details.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {FacilitatorComponent} from './facilitator/facilitator.component';
import {RequestComponent} from './request/request.component';
import {PetCreateComponent} from './pet-create/pet-create.component';
import {PetProfileComponent} from './pet-profile/pet-profile.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/:animalId', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  /*{path: 'profile/:userId}', component: ProfileComponent},*/
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:searchText', component: SearchComponent},
  {path: '', component: HomeComponent},
  {path: 'details/:animalId', component: AnimalDetailsComponent},
  {path: 'facilitator', component: FacilitatorComponent},
  {path: 'facilitator/request/:petId/:userId', component: RequestComponent},
  {path: 'customer/details', component: CustomerDetailsComponent},
  {path: 'pet-create', component: PetCreateComponent},
  {path: 'pet-profile/:petID', component: PetProfileComponent},
  {path: 'privacy', component: PrivacyPolicyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
