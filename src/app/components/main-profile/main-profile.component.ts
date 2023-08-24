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
      this.selectedImage= profile.image
    })
    this.profileDataService.getSelectedProfile().subscribe(selectedProfile => {
      if (selectedProfile) {
        this.profile = selectedProfile
        this.selectedImage = selectedProfile.image
      }
    })
  }

  openModal(content: any) {
    this.modalService.open(content);
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

  editImage() {
    if (this.selectedImage) {
      this.editedProfile.image = this.selectedImage
      this.svc.putMe(this.editedProfile).subscribe(updatedProfile => {
        this.profile = updatedProfile
        this.modalService.dismissAll()
        this.editedProfile.image = ''
      })
    }
  }

  handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.compressImageAndSet(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async compressImageAndSet(image: string) {
    const img = new Image();
    img.src = image;

    const maxDimension = 800; // Dimensione massima per larghezza o altezza

    return new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Impossibile ottenere il contesto del canvas');
          return;
        }

        let newWidth = img.width;
        let newHeight = img.height;

        // Ridimensiona l'immagine se necessario
        if (img.width > maxDimension || img.height > maxDimension) {
          const aspectRatio = img.width / img.height;
          if (aspectRatio > 1) {
            newWidth = maxDimension;
            newHeight = maxDimension / aspectRatio;
          } else {
            newWidth = maxDimension * aspectRatio;
            newHeight = maxDimension;
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Disegna l'immagine ridimensionata sul canvas e ottieni la stringa
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const compressedImageString = canvas.toDataURL('image/jpeg', 0.7); // Riduci la qualità dell'immagine

        // Imposta la stringa dell'immagine
        this.selectedImage = compressedImageString;

        resolve();
      };

      img.onerror = () => {
        reject('Errore durante il caricamento dell\'immagine');
      };
    });
  }


  openEditProfileModal(content: any) {
    this.editedProfile = { ...this.profile };
    this.modalService.open(content);
  }


}
