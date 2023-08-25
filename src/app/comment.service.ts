import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './interfaces/ipost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'https://striveschool-api.herokuapp.com/api/comments/';
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMmU0YjFmMTc1YzAwMTRjNTU4ZjAiLCJpYXQiOjE2OTI2MTAxMjMsImV4cCI6MTY5MzgxOTcyM30.ETmqHK7g4xFJsEHHrxxFrIvhpsdo4QBKPAyca7RcGOE';
  constructor(private http: HttpClient) { }

  getComment(id: string): Observable<IPost[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IPost[]>(this.apiUrl + id, { headers });
  }
  deleteComment(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.delete(this.apiUrl + id, { headers });
  }

  postComment(comment: IPost): Observable<IPost> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post<IPost>(this.apiUrl, comment, { headers });
  }

  putComment(id: string, comment: IPost): Observable<IPost> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.put<IPost>(this.apiUrl + id, comment, { headers });
  }
}
