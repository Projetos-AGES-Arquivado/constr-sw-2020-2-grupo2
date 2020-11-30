import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { DetailComponent } from './detail';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'detail', component: DetailComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);