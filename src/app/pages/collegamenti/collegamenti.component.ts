import { Component } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-collegamenti',
  templateUrl: './collegamenti.component.html',
  styleUrls: ['./collegamenti.component.scss']
})
export class CollegamentiComponent {

  profiles!:IProfile[]

  constructor(
    private svc: ServiceService
  ){}

  ngOnInit(){
    this.svc.getAll().subscribe( profiles => this.profiles = profiles)
  }

}
