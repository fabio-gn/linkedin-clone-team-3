import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProfile } from './interfaces/profile';
import { Observable } from 'rxjs';
import { IExperience } from './interfaces/experience';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl:string = 'https://striveschool-api.herokuapp.com/api/profile'
  authToken:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMmU0YjFmMTc1YzAwMTRjNTU4ZjAiLCJpYXQiOjE2OTI2MTAxMjMsImV4cCI6MTY5MzgxOTcyM30.ETmqHK7g4xFJsEHHrxxFrIvhpsdo4QBKPAyca7RcGOE'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getMe():Observable<IProfile>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    })

    return this.http.get<IProfile>(this.apiUrl+'/me', { headers })
  }

  getAll():Observable<IProfile[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    })

    return this.http.get<IProfile[]>(this.apiUrl, { headers })
  }

  getExp(id:string):Observable<IExperience[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    })
    return this.http.get<IExperience[]>(this.apiUrl+'/'+id+'/experiences', { headers})
  }

  postExp(id:string):Observable<IExperience>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    })
    return this.http.post<IExperience>(this.apiUrl+'/'+id+'/experiences', { headers})
  }

}
