import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { IProfile } from 'src/app/interfaces/profile';
import { ProfileDataService } from 'src/app/profile-data.service';
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
  collegamenti!:IProfile[]

  constructor(
    private svc: ServiceService,
    private modalService: NgbModal,
    private profileDataService: ProfileDataService
  ){}

  ngOnInit(){
    forkJoin([
      this.svc.getMe(),
      this.svc.getAll()
    ]).subscribe(([profile, profiles]) => {
      this.profile = profile;
      this.collegamenti = profiles;
    })
    this.profileDataService.getSelectedProfile().subscribe(selectedProfile => {
      if (selectedProfile) {
        this.profile = selectedProfile;
      }
    })
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

  editedProfile:Partial<IProfile> = {}

  editProfile() {
    this.svc.putMe(this.editedProfile).subscribe(updatedProfile => {
      this.profile = updatedProfile;
      this.editedProfile = {}
        this.modalService.dismissAll()
    })
  }

  openEditProfileModal(content: any) {
    this.editedProfile = { ...this.profile };
    this.modalService.open(content);
  }


}
