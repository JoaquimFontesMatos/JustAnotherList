import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  Subject,
  BehaviorSubject,
  tap,
  filter,
  catchError,
  throwError,
} from 'rxjs';
import { Manga, UserManga } from '../models/Manga';
import { environment } from '../../environments/environment';

const endpoint = environment.backendUrl + 'm/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MangaServiceService {
  private addMangaSubject = new BehaviorSubject<Manga>(new Manga()); // Initialize with default Manga object

  constructor(private http: HttpClient) {}

  getMangas(): Observable<UserManga[]> {
    return this.http.get<UserManga[]>(endpoint + 'mangas');
  }

  isMangaMalIdSaved(id: number): Observable<boolean> {
    return this.http.get<boolean>(endpoint + 'manga-mal-id/' + id);
  }

  saveManga(manga: Manga): Observable<Manga> {
    return this.http
      .post<Manga>(endpoint + 'mangas', JSON.stringify(manga), httpOptions)
      .pipe(
        tap((newManga: Manga) => {
          this.addMangaSubject.next(newManga); // Emit new manga
        }),
        catchError((error) => {
          console.error('Error saving manga:', error);
          return throwError(error);
        })
      );
  }

  getMangaAddedObservable(): Observable<Manga> {
    return this.addMangaSubject.asObservable().pipe(
      filter((manga) => manga !== null) // Filter out null values if needed
    );
  }
}
