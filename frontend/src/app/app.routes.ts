import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CampagnyComponent } from './campagny/Campagny-Component';
import { ProblemComponent } from './problem/problem-component';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'campagny', component: CampagnyComponent },
 { path: 'problem', component: ProblemComponent }
];
    


