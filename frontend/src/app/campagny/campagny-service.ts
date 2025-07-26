import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campagny {
id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampagnyService {
   private apiUrl = 'http://localhost:9090/api/campagnies'; // à adapter

  constructor(private http: HttpClient) {}

  getAllCampagnies(): Observable<Campagny[]> {
    return this.http.get<Campagny[]>(`${this.apiUrl}`);
  }
  
  getCampagnyByName(name: string): Observable<Campagny[]> {
    return this.http.get<Campagny[]>(`${this.apiUrl}/search?name=${name}`);
  }

 createCampagny(campagny: Campagny): Observable<Campagny> {
    return this.http.post<Campagny>(`${this.apiUrl}`, campagny);
  }
  updateCampagny(id: number, campagny: Campagny): Observable<Campagny> {
    return this.http.put<Campagny>(`${this.apiUrl}/${id}`, campagny);
  }

  deleteCampagny(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //hado tal men be3d
  getCampagnyById(id: number): Observable<Campagny> {
    return this.http.get<Campagny>(`${this.apiUrl}/${id}`);
  }/*
  searchCampagnies(term: string): Observable<Campagny[]> {
    return this.http.get<Campagny[]>(`${this.apiUrl}/search?term=${term}`);
  }
    */
  getCampagnyCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
  
}
