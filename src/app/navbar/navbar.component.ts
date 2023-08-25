import { Component } from '@angular/core';
import { IProfile } from '../interfaces/profile';
import { ProfileDataService } from '../profile-data.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  search: boolean = false;
  profilo!: IProfile;

  constructor(
    private svc: ServiceService,
    private profileDataService: ProfileDataService
  ) {
    this.svc.me.asObservable().subscribe((me) => {
      this.profilo = me;
    });
  }

  searchToggle(): void {
    this.search = !this.search;
  }

  updateMainProfileData(): void {
    this.svc.getMe().subscribe((profile: IProfile) => {
      this.profileDataService.setSelectedProfile(profile);
    });
  }
}
