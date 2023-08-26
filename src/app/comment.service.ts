import { IComment } from 'src/app/interfaces/icomment';
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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YzgxMDEyYjUwYzAwMTQ5ZTRmNjQiLCJpYXQiOjE2OTMwNzQzNjYsImV4cCI6MTY5NDI4Mzk2Nn0.Zd1UM5QRVD-T-BA5_ebsOy4tgK77LiIufzeDwKH9kJc';
  constructor(private http: HttpClient) {}

  getComment(id: string): Observable<IComment[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IComment[]>(this.apiUrl + id, { headers });
  }
  deleteComment(comment:IComment): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.delete(this.apiUrl + comment._id, { headers, responseType: 'text', });
  }

  postComment(comment: Partial<IComment>): Observable<IComment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<IComment>(this.apiUrl, comment, { headers });
  }

  putComment(id: string, comment: Partial<IComment>): Observable<IComment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<IComment>(this.apiUrl + id, comment, { headers });
  }
}
