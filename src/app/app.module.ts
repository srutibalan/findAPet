import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SearchComponent} from './search/search.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AnimalDetailsComponent} from './animal-details/animal-details.component';
import {FavoriteService} from './services/favorite.service';
import {AdoptionService} from './services/adoption.service';
import {FacilitatorService} from './services/facilitator.service';
import {FacilitatorComponent} from './facilitator/facilitator.component';
import {RequestComponent} from './request/request.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RecentlyAdoptedComponent} from './recently-adopted/recently-adopted.component';
import { PetCreateComponent } from './pet-create/pet-create.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {NgbAlertModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {FollowService} from './services/follow.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    SearchComponent,
    AnimalDetailsComponent,
    CustomerDetailsComponent,
    FacilitatorComponent,
    RequestComponent,
    RecentlyAdoptedComponent,
    PetCreateComponent,
    PetProfileComponent,
    PrivacyPolicyComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatChipsModule,
    NgbCarouselModule,
    NgbAlertModule
  ],
  providers: [UserService, FavoriteService, AdoptionService, FacilitatorService, FollowService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
