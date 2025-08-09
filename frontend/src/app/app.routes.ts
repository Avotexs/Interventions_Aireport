import { Routes } from '@angular/router';
import { Home } from './home/home';

import { ProblemComponent } from './problem/problem-component';
import { CampagnyComponent } from './campagny/Campagny-Component';
import { SolutionComponent } from './solution/solution-component';
import { EquipementComponent } from './equipement/equipement-component';
import { ProjectComponent } from './projet/project-component';

import { TechnicienComponent } from './technicien-component/technicien-component';
import { AeroportComponent } from './aeroport-component/aeroport-component';
export const routes: Routes = [
  
  { path: '', component: Home },
  { path: 'problem', component: ProblemComponent },
  { path: 'campagny', component: CampagnyComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'zone',      loadComponent: () => import('./zone/zone-component')
                                         .then(m => m.ZoneComponent) },
  { path: 'comptoire', loadComponent: () => import('./comptoire/comptoire-component')
                                         .then(m => m.ComptoireComponent) },
  { path: 'technicien', component: TechnicienComponent },
  { path: 'aeroport', component: AeroportComponent },
    { path: 'equipement', component: EquipementComponent },
  { path: 'project', component: ProjectComponent }

];