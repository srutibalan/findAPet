import {Component, OnInit, ViewChild} from '@angular/core';
import {FacilitatorService} from '../services/facilitator.service';
import {Adopt} from '../models/adopt';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {PetFinderAnimalModel} from '../interfaces/pet-finder-animal-model';
import {PetService} from '../services/pet.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models';


@Component({
  selector: 'app-facilitator',
  templateUrl: './facilitator.component.html',
  styleUrls: ['./facilitator.component.css']
})
export class FacilitatorComponent implements OnInit {
  currentUser: User;
  adoptionRequests: Adopt[];
  petId = '';
  userId = '';
  pet: PetFinderAnimalModel;
  displayedColumns: string[] = ['petId', 'userName', 'status'];
  dataSource: MatTableDataSource<Adopt>;

  constructor(private facilitatorService: FacilitatorService,
              private route: ActivatedRoute,
              private petService: PetService,
              private router: Router) {

    this.facilitatorService.findAllAdoptionRequests().then((data => {
      const arr = [];
      let d: Adopt;
      for (d of data) {
        arr.push(JSON.parse(JSON.stringify(d)));
      }
      this.adoptionRequests = arr;
      this.dataSource = new MatTableDataSource<Adopt>(this.adoptionRequests);

    }));
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser') != null) {
      /*this.isLoggedIn = new BehaviorSubject<boolean>(true);*/
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      // alert(this.currentUser.firstName);
      if (this.currentUser.role === 'FACILITATOR' || this.currentUser.role === 'ADMIN') {

      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
    this.route.params.subscribe(async params => {
        this.petId = params.petId;
        this.userId = params.userId;
        this.dataSource = new MatTableDataSource<Adopt>(this.adoptionRequests);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
