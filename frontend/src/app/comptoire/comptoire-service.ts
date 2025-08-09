import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Zone } from '../zone/zone-service';

export interface Comptoire { id?: number; nom: string; zoneId: number; zone?: Zone; }

@Injectable({ providedIn: 'root' })
export class ComptoireService {
  private apiUrl = 'http://localhost:9090/api/comptoires';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }

  getAll(): Observable<Comptoire[]> { 
    return this.http.get<Comptoire[]>(this.apiUrl)
      .pipe(catchError(this.handleError)); 
  }
  
  search(nom: string): Observable<Comptoire[]> { 
    return this.http.get<Comptoire[]>(`${this.apiUrl}/search?nom=${nom}`)
      .pipe(catchError(this.handleError)); 
  }
  
  create(c: Comptoire): Observable<Comptoire> { 
    return this.http.post<Comptoire>(this.apiUrl, c)
      .pipe(catchError(this.handleError)); 
  }
  
  update(id: number, c: Comptoire): Observable<Comptoire> { 
    return this.http.put<Comptoire>(`${this.apiUrl}/${id}`, c)
      .pipe(catchError(this.handleError)); 
  }
  
  delete(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError)); 
  }
}