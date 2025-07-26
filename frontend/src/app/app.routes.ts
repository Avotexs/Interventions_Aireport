import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CampagnyComponent } from './campagny/Campagny-Component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'campagny', component: CampagnyComponent },

];
    


