import { Routes } from '@angular/router';
import { Home } from './home/home';

import { ProblemComponent } from './problem/problem-component';
import { CampagnyComponent } from './campagny/Campagny-Component';
import { SolutionComponent } from './solution/solution-component';

export const routes: Routes = [
  
  { path: '', component: Home },
  { path: 'problem', component: ProblemComponent },
  { path: 'campagny', component: CampagnyComponent },
  { path: 'solution', component: SolutionComponent }

];