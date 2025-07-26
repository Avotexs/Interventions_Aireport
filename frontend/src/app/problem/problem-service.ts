import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Problem {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
    private apiUrl = 'http://localhost:9090/api/problems';

  constructor(private http: HttpClient) {}

  getAllProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.apiUrl);
  }

  getProblemByName(name: string): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.apiUrl}/search?name=${name}`);
  }

  createProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(this.apiUrl, problem);
  }

  updateProblem(id: number, problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(`${this.apiUrl}/${id}`, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
