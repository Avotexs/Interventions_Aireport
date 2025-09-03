import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Zone { id?: number; nom: string; }

@Injectable({ providedIn: 'root' })
export class ZoneService {
  private apiUrl = 'http://localhost:9090/api/zones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Zone[]>           { return this.http.get<Zone[]>(this.apiUrl); }
  search(nom: string): Observable<Zone[]> { return this.http.get<Zone[]>(`${this.apiUrl}/search?nom=${nom}`); }
  create(zone: Zone): Observable<Zone>    { return this.http.post<Zone>(this.apiUrl, zone); }
  update(id: number, z: Zone): Observable<Zone> { return this.http.put<Zone>(`${this.apiUrl}/${id}`, z); }
  delete(id: number): Observable<void>    { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  
}
