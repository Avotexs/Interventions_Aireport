import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProblemComponent } from './problem/problem-component';

export const routes: Routes = [
  
  { path: '', component: Home },
  { path: 'problem', component: ProblemComponent }
];
