import { Component, Input } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { ServiceService } from '../service.service';
import { IProfile } from '../interfaces/profile';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss']
})
export class PostMidComponent {
@Input() post!: IPost



}








// constructor(private svc: ServiceService){

// }

// profilo!:IProfile
// collegamenti!:IProfile[]
// ngOnInit(){
//   this.svc.getMe().subscribe(profilo => this.profilo = profilo)
//   this.svc.getAll().subscribe(collegamenti => this.collegamenti = collegamenti)
// }
// }
