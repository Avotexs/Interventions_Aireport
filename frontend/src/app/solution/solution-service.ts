import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Solution {
  id ? : number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private apiUrl = 'http://localhost:9090/api/solutions'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  // Obtenir toutes les solutions
  getAllSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.apiUrl);
  }

  // Rechercher des solutions par nom
  getSolutionByName(name: string): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`);
  }

  // Créer une nouvelle solution
  createSolution(solution: { name: string }): Observable<Solution> {
    return this.http.post<Solution>(this.apiUrl, solution);
  }

  // Modifier une solution existante
  updateSolution(id: number, solution: { name: string }): Observable<Solution> {
    return this.http.put<Solution>(`${this.apiUrl}/${id}`, solution);
  }

  // Supprimer une solution
  deleteSolution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer une solution par ID (optionnel)
  getSolutionById(id: number): Observable<Solution> {
    return this.http.get<Solution>(`${this.apiUrl}/${id}`);
  }

  // (Optionnel) Compter le nombre de solutions
  getSolutionCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}