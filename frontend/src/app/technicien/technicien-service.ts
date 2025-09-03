import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Intervention {
  id: number;
  numero: number;
  date: Date;
  dateDebut: Date;
  dateFin: Date;
  duration: string;
  inProgress: boolean;
  equipementid :number;
  campagnyId: number;
  zoneId: number;
  comptoireId: number;
  solutionId: number | null;
  problemId: number;
  aeroportId: number;
  technicienId: number;
  projetId: number;
}

export interface EquipementDTO {
  equipementId: number;
  quantite: number;
}


export interface Equipement {
  id: number;
  nameEquipement: string;
  quantite: number;
}




@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  
private apiUrl = 'http://localhost:9090/api/interventions';
    private apiUrlCampagne = 'http://localhost:9090/api/campagnies';
    private apiUrlZone = 'http://localhost:9090/api/zones';
    private apiUrlTechnicien = 'http://localhost:9090/api/techniciens';
    private apiUrlComptoire = 'http://localhost:9090/api/comptoires';
    private apiUrlAeroport = 'http://localhost:9090/api/aeroports';
    private apiUrlProject = 'http://localhost:9090/api/projects';

    private apiUrlProblem = 'http://localhost:9090/api/problems';

    private apiUrlSolution = 'http://localhost:9090/api/solutions';
  // This service can be used to manage interventions related to aeroports or techniciens
  // Currently, it is empty but can be expanded with methods for fetching, creating, updating, and deleting interventions.
  
  constructor(private http: HttpClient) {
    // Initialization logic if needed
  }

 getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.apiUrl);
  }

  getInterventionById(id: number): Observable<Intervention> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Intervention>(url);
  }

  createIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(this.apiUrl, intervention);
  }

  updateIntervention(id: number, intervention: Intervention): Observable<Intervention> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Intervention>(url, intervention);
  }

  deleteIntervention(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // list of Campagne
  getCampagne(): Observable<any> {
    return this.http.get<any>(this.apiUrlCampagne);
  }

  // list of Zone
  getZone(): Observable<any> {
    return this.http.get<any>(this.apiUrlZone);
  }

  // list of Technicien
  getTechnicien(): Observable<any> {
    return this.http.get<any>(this.apiUrlTechnicien);
  }

  // list of Comptoire
  getComptoire(): Observable<any> {
    return this.http.get<any>(this.apiUrlComptoire);
  }

  // list of Aeroport
  getAeroport(): Observable<any> {
    return this.http.get<any>(this.apiUrlAeroport);
  }

  // list of Project
  getProject(): Observable<any> {
    return this.http.get<any>(this.apiUrlProject);
  }

  //list of Problems
  getProblems(): Observable<any> {
    return this.http.get<any>(this.apiUrlProblem);
  }

  //list of Solutions
  getSolutions(): Observable<any> {
    return this.http.get<any>(this.apiUrlSolution);
  }


}
