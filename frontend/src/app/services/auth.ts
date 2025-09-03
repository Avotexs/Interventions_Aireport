import { Injectable, computed, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface LoginRequest { pseudoname: string; motDePass: string; }
export interface LoginResponse {
  id: number;
  role: 'admin' | 'technicien';
  firstname: string;
  lastname: string;
  aeroportId?: number | null;
  token: string;
}

const STORAGE_KEY = 'app_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth';
  private _user = signal<LoginResponse | null>(this.readStored());

  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());
  role = computed(() => this._user()?.role);

  constructor(private http: HttpClient, private router: Router) {}

  login(pseudoname: string, motDePass: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { pseudoname, motDePass })
      .pipe(
        tap(res => {
          this._user.set(res);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
          if (res.role === 'admin') {
            this.router.navigateByUrl('/');
          } else {
            this.router.navigateByUrl('/technicien-home');
          }
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  logout() {
    const token = this._user()?.token;
    this.http.post(`${this.apiUrl}/logout`, null, { headers: { 'X-Auth-Token': token ?? '' } })
      .subscribe({ complete: () => {} });

    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigateByUrl('/login');
  }

  private readStored(): LoginResponse | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    try { return raw ? JSON.parse(raw) as LoginResponse : null; } catch { return null; }
  }
}
