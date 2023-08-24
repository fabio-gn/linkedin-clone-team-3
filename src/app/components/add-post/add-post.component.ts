import { ServiceService } from 'src/app/service.service';
import { Component } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
constructor(private srv:ServiceService){

}
profilo!: IProfile
ngOnInit(){
  this.srv.getMe().subscribe(profilo => this.profilo = profilo)
}
}
