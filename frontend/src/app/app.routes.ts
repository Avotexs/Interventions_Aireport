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
export const routes: Routes = [
  

  { path: '', component: Home },
  { path: 'problem', component: ProblemComponent },
  { path: 'campagny', component: CampagnyComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'intervention', component: InterventionComponent },
  { path: 'zone',      component: ZoneComponent },
  { path: 'comptoire', component: ComptoireComponent },
  { path: 'techniciens', component: TechnicienComponent },
  { path: 'aeroport', component: AeroportComponent },
  { path: 'equipement', component: EquipementComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'technicien', component: Technicien }

];