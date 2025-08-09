import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicienComponent } from '../technicien-component/technicien-component';
import { Aeroport } from '../aeroport-component/aeroport-service';


export interface Technicien {
  id?: number;
  firstname: string;
  lastname: string;
  pseudoname: string;
  role: string;
  motDePass: string;
  aeroportId: number | null; // Changed to allow null for optional field

}



@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  private apiUrl = 'http://localhost:9090/api/techniciens';
  private apiUrl2 = 'http://localhost:9090/api/aeroports';

  constructor(private http: HttpClient) {}
  /**
   * Fetches all techniciens from the backend.
   * @returns Observable of Technicien array
   */
getTechniciens(): Observable<Technicien[]> {
  return this.http.get<Technicien[]>(this.apiUrl);

}

  create(technicien: Technicien): Observable<Technicien> {
    return this.http.post<Technicien>(this.apiUrl, technicien);
  }
  update(id: number, technicien: Technicien): Observable<Technicien> {
    return this.http.put<Technicien>(`${this.apiUrl}/${id}`, technicien);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAeroports(): Observable<Aeroport[]> {
    return this.http.get<Aeroport[]>(this.apiUrl2);
  }
  getAeroportById(id: number): Observable<Aeroport> {
      return this.http.get<Aeroport>(`${this.apiUrl2}/${id}`);
    }
}
