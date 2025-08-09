import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipement {
  id?: number;
  nameEquipement: string;
  quantite: number; // <-- MODIF : correspond au champ du DTO backend
}

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private apiUrl = 'http://localhost:9090/api/equipements';

  constructor(private http: HttpClient) {}

  getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.apiUrl);
  }

  getEquipementById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.apiUrl}/${id}`);
  }

  createEquipement(equipement: { nameEquipement: string; quantite: number }): Observable<Equipement> {
    return this.http.post<Equipement>(this.apiUrl, equipement);
  }

  updateEquipement(id: number, equipement: { nameEquipement: string; quantite: number }): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}/${id}`, equipement);
  }

  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
