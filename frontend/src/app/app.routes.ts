
import { Routes } from '@angular/router';

import { Home } from './home/home';
import { ProblemComponent } from './problem/problem-component';
import { CampagnyComponent } from './campagny/Campagny-Component';
import { SolutionComponent } from './solution/solution-component';
import { EquipementComponent } from './equipement/equipement-component';
import { ProjectComponent } from './projet/project-component';
import { ZoneComponent } from './zone/zone-component';
import { ComptoireComponent } from './comptoire/comptoire-component';
import { TechnicienComponent } from './technicien-component/technicien-component';
import { AeroportComponent } from './aeroport-component/aeroport-component';
import { InterventionComponent } from './intervention-component/intervention-component';
import { Technicien } from './technicien/technicien';

// ⚠️ Ajoute ces imports :
import { LoginComponent } from './login/login';
import { TechnicienHomeComponent } from './technicien-home/technicien-home';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
  // Page de connexion (publique)
  { path: 'login', component: LoginComponent },

  // Page d'accueil du technicien (protégée rôle 'technicien')
  {
    path: 'technicien-home',
    component: TechnicienHomeComponent,
    canActivate: [authGuard, roleGuard(['technicien'])],
    children: [

      { path: 'technicien', component: Technicien },
      
    ]
  },

  // Bloc ADMIN : toutes tes pages actuelles sont ici et protégées
  {
    path: '',
    canActivate: [authGuard, roleGuard(['admin'])],
    children: [
      { path: '', component: Home },
      { path: 'problem', component: ProblemComponent },
      { path: 'campagny', component: CampagnyComponent },
      { path: 'solution', component: SolutionComponent },
      { path: 'comptoire', component: ComptoireComponent },
      { path: 'zone', component: ZoneComponent },
      { path: 'techniciens', component: TechnicienComponent },
      { path: 'aeroport', component: AeroportComponent },
      { path: 'intervention', component: InterventionComponent },
      { path: 'equipement', component: EquipementComponent },
      { path: 'project', component: ProjectComponent }
      
    ]
  },

  // Sinon → login
  { path: '**', redirectTo: 'login' }
];
