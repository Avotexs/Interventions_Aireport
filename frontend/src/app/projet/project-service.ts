import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EquipementDTO {
  equipementId: number;
  quantite: number;
}

export interface ProjectDTO {
  id?: number;
  name: string;
  equipements: EquipementDTO[];
}
export interface Equipement {
  id: number;
  nameEquipement: string;
  quantite: number;
}



@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:9090/api/projects'; // adapte le port si besoin

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDTO[]> {
    // Map raw data to include possible 'projetEquipements' property
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(p => ({
        id: p.id,
        name: p.name,
        equipements: p.projetEquipements ?? p.equipements ?? []
      } as ProjectDTO)))
    );
  }

  getProjectById(id: number): Observable<ProjectDTO> {
    return this.http.get<ProjectDTO>(`${this.apiUrl}/${id}`);
  }

  createProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(this.apiUrl, project);
  }

  updateProject(id: number, project: ProjectDTO): Observable<ProjectDTO> {
    return this.http.put<ProjectDTO>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAllEquipements(): Observable<Equipement[]> {
  return this.http.get<Equipement[]>('http://localhost:9090/api/equipements'); // adapte l'URL si besoin
}
  getEquipementById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`http://localhost:9090/api/equipements/${id}`); // adapte l'URL si besoin
  }

  createEquipement(equipement: { nameEquipement: string; quantite: number }): Observable<Equipement> {
    return this.http.post<Equipement>('http://localhost:9090/api/equipements', equipement); // adapte l'URL si besoin
  }

  updateEquipement(id: number, equipement: { nameEquipement: string; quantite: number }): Observable<Equipement> {
    return this.http.put<Equipement>(`http://localhost:9090/api/equipements/${id}`, equipement); // adapte l'URL si besoin
  }

  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:9090/api/equipements/${id}`); // adapte l'URL si besoin
  }
}
