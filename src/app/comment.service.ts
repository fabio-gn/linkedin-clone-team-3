import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './interfaces/ipost';
import { Observable } from 'rxjs';
import { IComment } from './interfaces/icomment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'https://striveschool-api.herokuapp.com/api/comments/';
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMmU0YjFmMTc1YzAwMTRjNTU4ZjAiLCJpYXQiOjE2OTI2MTAxMjMsImV4cCI6MTY5MzgxOTcyM30.ETmqHK7g4xFJsEHHrxxFrIvhpsdo4QBKPAyca7RcGOE';
  constructor(private http: HttpClient) {}

  getComment(id: string): Observable<IComment[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IComment[]>(this.apiUrl + id, { headers });
  }
  deleteComment(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.delete(this.apiUrl + id, { headers });
  }

  postComment(comment: IComment): Observable<IComment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.post<IComment>(this.apiUrl, comment, { headers });
  }

  putComment(id: string, comment: IComment): Observable<IComment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.put<IComment>(this.apiUrl + id, comment, { headers });
  }
}
