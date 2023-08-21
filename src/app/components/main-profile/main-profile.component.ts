import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProfile } from 'src/app/interfaces/profile';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent {

  profile!:IProfile
  selectedImage!:string
  selectedCoverImage!:string

  constructor(
    private svc: ServiceService,
    private modalService: NgbModal
  ){}

  ngOnInit(){
    this.svc.getMe().subscribe( profile => this.profile = profile)
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleCoverChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedCoverImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
