import { Component } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-homeprofilecard',
  templateUrl: './homeprofilecard.component.html',
  styleUrls: ['./homeprofilecard.component.scss']
})
export class HomeprofilecardComponent {
  constructor(private svc: ServiceService){

  }
  profilo!:IProfile
  collegamenti!:IProfile[]
  ngOnInit(){
    this.svc.getMe().subscribe(profilo => this.profilo = profilo)
    this.svc.getAll().subscribe(collegamenti => this.collegamenti = collegamenti)
  }

}
