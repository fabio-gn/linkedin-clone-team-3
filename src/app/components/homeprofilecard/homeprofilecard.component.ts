import { Component } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-homeprofilecard',
  templateUrl: './homeprofilecard.component.html',
  styleUrls: ['./homeprofilecard.component.scss'],
})
export class HomeprofilecardComponent {
  constructor(private svc: ServiceService) {
    this.svc.me.asObservable().subscribe((me) => {
      this.profilo = me;
    });
  }
  profilo!: IProfile;
  collegamenti!: IProfile[];
  ngOnInit() {
    this.svc
      .getAll()
      .subscribe((collegamenti) => (this.collegamenti = collegamenti));
  }
}
