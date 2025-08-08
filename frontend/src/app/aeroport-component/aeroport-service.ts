import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aeroport {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AeroportService {
      private apiUrl = 'http://localhost:9090/api/aeroports';
  
    constructor(private http: HttpClient) {}

    getAllAeroports(): Observable<Aeroport[]> {
      return this.http.get<Aeroport[]>(this.apiUrl);
    }
  
    getAeroportByName(name: string): Observable<Aeroport[]> {
      return this.http.get<Aeroport[]>(`${this.apiUrl}/search?name=${name}`);
    }

    createAeroport(aeroport: Aeroport): Observable<Aeroport> {
      return this.http.post<Aeroport>(this.apiUrl, aeroport);
    }
  
    updateAeroport(id: number, aeroport: Aeroport): Observable<Aeroport> {
      return this.http.put<Aeroport>(`${this.apiUrl}/${id}`, aeroport);
    }

    deleteAeroport(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
}
