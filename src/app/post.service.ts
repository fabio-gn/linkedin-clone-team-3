import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './interfaces/ipost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://striveschool-api.herokuapp.com/api/posts/';
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMmU0YjFmMTc1YzAwMTRjNTU4ZjAiLCJpYXQiOjE2OTI2MTAxMjMsImV4cCI6MTY5MzgxOTcyM30.ETmqHK7g4xFJsEHHrxxFrIvhpsdo4QBKPAyca7RcGOE';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<IPost[]>(this.apiUrl, { headers });
  }

  getPost(postId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get<any>(`${this.apiUrl}${postId}`, { headers });
  }

  createPost(post: IPost): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(post);
    return this.http.post<IPost>(this.apiUrl, body, { headers });
  }

  updatePost(postId: string, post: Partial<IPost>): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}${postId}`, post, { headers });
  }

  deletePost(postId: IPost): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.delete(`${this.apiUrl}${postId._id}`, {
      headers,
      responseType: 'text',
    });
  }
}
