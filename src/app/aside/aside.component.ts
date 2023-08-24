import { Component, EventEmitter, Output } from '@angular/core';
import { IProfile } from '../interfaces/profile';
import { ServiceService } from '../service.service';
import { ProfileDataService } from '../profile-data.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  altriCollegamenti!: IProfile[]
  personeCollegamenti!: IProfile[]
  profilo!:IProfile

  constructor(
    private svc: ServiceService,
    private profileDataService: ProfileDataService
  ){}

  ngOnInit(){
    this.svc.getMe().subscribe(profilo => this.profilo = profilo)
    this.svc.getAll().subscribe(profiles => {
      const shuffledProfiles = profiles.sort(() => Math.random() - 0.5)
      this.altriCollegamenti = shuffledProfiles.slice(0, 6)
      this.personeCollegamenti = shuffledProfiles.slice(6, 12)
      this.altriCollegamenti.forEach(profile => {
        profile.statoCollegamento = 'collegato';
      })
      this.personeCollegamenti.forEach(profile => {
        profile.statoCollegamento = 'collegato';
      })
    })
  }

  cambiaStatoCollegamento(profile: IProfile) {
    if (profile.statoCollegamento === 'collegato') {
      profile.statoCollegamento = 'attesa';
    } else {
      profile.statoCollegamento = 'collegato';
    }
  }

  selectProfile(profile: IProfile) {
    this.profileDataService.setSelectedProfile(profile);
  }


}
