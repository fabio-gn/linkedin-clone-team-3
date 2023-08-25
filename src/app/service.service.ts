import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProfile } from './interfaces/profile';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IExperience } from './interfaces/experience';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl: string = 'https://striveschool-api.herokuapp.com/api/profile';
  authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMmU0YjFmMTc1YzAwMTRjNTU4ZjAiLCJpYXQiOjE2OTI2MTAxMjMsImV4cCI6MTY5MzgxOTcyM30.ETmqHK7g4xFJsEHHrxxFrIvhpsdo4QBKPAyca7RcGOE';
  me = new BehaviorSubject<IProfile>({} as IProfile);
  constructor(private http: HttpClient, private router: Router) {
    this.getMe().subscribe();
  }

  getMe(): Observable<IProfile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IProfile>(this.apiUrl + '/me', { headers }).pipe(
      tap((res) => {
        this.me.next(res);
      })
    );
  }

  getAll(): Observable<IProfile[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IProfile[]>(this.apiUrl, { headers });
  }

  getSpec(id: string): Observable<IProfile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IProfile>(this.apiUrl + '/' + id, { headers });
  }

  putMe(update: Partial<IProfile>): Observable<IProfile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<IProfile>(this.apiUrl, update, { headers });
  }

  getExp(id: string): Observable<IExperience[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IExperience[]>(
      this.apiUrl + '/' + id + '/experiences',
      { headers }
    );
  }

  postExp(
    id: string,
    experience: Partial<IExperience>
  ): Observable<IExperience> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<IExperience>(
      this.apiUrl + '/' + id + '/experiences',
      experience,
      { headers }
    );
  }

  putExp(
    id: string,
    expId: string,
    experience: Partial<IExperience>
  ): Observable<IExperience> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<IExperience>(
      this.apiUrl + '/' + id + '/experiences/' + expId,
      experience,
      { headers }
    );
  }

  deleteExp(id: string, expId: string): Observable<unknown> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.delete(this.apiUrl + '/' + id + '/experiences/' + expId, {
      headers,
      responseType: 'text',
    });
  }
}
