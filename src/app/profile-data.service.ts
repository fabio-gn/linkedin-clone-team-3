import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfile } from './interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private selectedProfileSubject: BehaviorSubject<IProfile | null> = new BehaviorSubject<IProfile | null>(null);

  constructor() {}

  setSelectedProfile(profile: IProfile) {
    this.selectedProfileSubject.next(profile);
  }

  getSelectedProfile(): Observable<IProfile | null> {
    return this.selectedProfileSubject.asObservable();
  }
}
