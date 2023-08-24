// Importiamo il decoratore Injectable dal modulo @angular/core per creare un servizio Angular
import { Injectable } from '@angular/core';
// Importiamo HttpClient e HttpHeaders dal modulo @angular/common/http per effettuare richieste HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importiamo Observable dal modulo rxjs per utilizzare gli Observable come tipo di ritorno dei metodi del servizio
import { Observable } from 'rxjs';

// Utilizziamo il decoratore Injectable per indicare che questa classe può essere iniettata come dipendenza in altri componenti o servizi
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Definiamo l'URL base delle API per i post
  private apiUrl = 'https://striveschool-api.herokuapp.com/api/posts/';
  // Definiamo il token di autenticazione per le richieste alle API, cambiare con il proprio token
  private authToken = '<YOUR_AUTH_TOKEN_HERE>';

  // Iniettiamo HttpClient nel costruttore del servizio per poterlo utilizzare per effettuare richieste HTTP
  constructor(private http: HttpClient) { }

  // Definiamo un metodo getPosts per ottenere tutti i post esistenti
  getPosts(): Observable<any[]> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
    // Utilizziamo il metodo get di HttpClient per effettuare una richiesta GET all'URL delle API dei post, passando l'oggetto headers come opzione della richiesta
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Definiamo un metodo getPost per ottenere un singolo post specificato dall'ID del post
  getPost(postId: string): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
    // Utilizziamo il metodo get di HttpClient per effettuare una richiesta GET all'URL delle API dei post, aggiungendo l'ID del post all'URL e passando l'oggetto headers come opzione della richiesta
    return this.http.get<any>(`${this.apiUrl}${postId}`, { headers });
  }

  // Definiamo un metodo createPost per creare un nuovo post
  createPost(post: { text: string }): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare gli header Authorization e Content-Type con il token di autenticazione e il tipo di contenuto della richiesta
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    // Utilizziamo il metodo post di HttpClient per effettuare una richiesta POST all'URL delle API dei post, inviando il contenuto del post come corpo della richiesta e passando l'oggetto headers come opzione della richiesta
    return this.http.post<any>(this.apiUrl, post, { headers });
  }

  // Definiamo un metodo updatePost per aggiornare un post esistente specificato dall'ID del post
  updatePost(postId: string, post: { text: string }): Observable<any> {
    // Creiamo un oggetto HttpHeaders per impostare gli header Authorization e Content-Type con il token di autenticazione e il tipo di contenuto della richiesta
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    // Utilizziamo il metodo put di HttpClient per effettuare una richiesta PUT all'URL delle API dei post, aggiungendo l'ID del post all'URL, inviando il contenuto aggiornato del post come corpo della richiesta e passando l'oggetto headers come opzione della richiesta
    return this.http.put<any>(`${this.apiUrl}${postId}`, post, { headers });
  }

  // Definiamo un metodo deletePost per cancellare un post esistente specificato dall'ID del post
  deletePost(postId: string): Observable<void> {
    // Creiamo un oggetto HttpHeaders per impostare l'header Authorization con il token di autenticazione
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
    // Utilizziamo il metodo delete di HttpClient per effettuare una richiesta DELETE all'URL delle API dei post, aggiungendo l'ID del post all'URL e passando l'oggetto headers come opzione della richiesta
    return this.http.delete<void>(`${this.apiUrl}${postId}`, { headers });
  }
}
