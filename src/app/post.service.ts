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

  // Definiamo un metodo getPosts per ottenere tutti i post esistenti
  getPosts(): Observable<IPost[]> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    // Utilizziamo il metodo get di HttpClient per effettuare una richiesta GET all'URL delle API dei post, passando l'oggetto headers come opzione della richiesta
    return this.http.get<IPost[]>(this.apiUrl, { headers });
  }

  // Definiamo un metodo getPost per ottenere un singolo post specificato dall'ID del post
  getPost(postId: string): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    // Utilizziamo il metodo get di HttpClient per effettuare una richiesta GET all'URL delle API dei post, aggiungendo l'ID del post all'URL e passando l'oggetto headers come opzione della richiesta
    return this.http.get<any>(`${this.apiUrl}${postId}`, { headers });
  }

  // Definiamo un metodo createPost per creare un nuovo post
  createPost(post: IPost): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare gli header Authorization e Content-Type con il token di autenticazione e il tipo di contenuto della richiesta
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(post);

    // Utilizziamo il metodo post di HttpClient per effettuare una richiesta POST all'URL delle API dei post, inviando il contenuto del post come corpo della richiesta e passando l'oggetto headers come opzione della richiesta
    return this.http.post<IPost>(this.apiUrl, body, { headers });
  }

  // Definiamo un metodo updatePost per aggiornare un post esistente specificato dall'ID del post
  updatePost(postId: string, post: { text: string }): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare gli header Authorization e Content-Type con il token di autenticazione e il tipo di contenuto della richiesta
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    });
    // Utilizziamo il metodo put di HttpClient per effettuare una richiesta PUT all'URL delle API dei post, aggiungendo l'ID del post all'URL, inviando il contenuto aggiornato del post come corpo della richiesta e passando l'oggetto headers come opzione della richiesta
    return this.http.put<any>(`${this.apiUrl}${postId}`, post, { headers });
  }

  // Definiamo un metodo deletePost per cancellare un post esistente specificato dall'ID del post
  deletePost(postId: string): Observable<void> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    // Utilizziamo il metodo delete di HttpClient per effettuare una richiesta DELETE all'URL delle API dei post, aggiungendo l'ID del post all'URL e passando l'oggetto headers come opzione della richiesta
    return this.http.delete<void>(`${this.apiUrl}${postId}`, { headers });
  }
}
