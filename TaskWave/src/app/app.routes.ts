import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectComponent } from './Components/Project/project/project.component';
import { WrapperComponent } from './Components/Wrapper/wrapper/wrapper.component';
import { WrapperListComponent } from './Components/Wrapper/wrapper-list/wrapper-list.component';
import { ProjectListComponent } from './Components/Project/project-list/project-list.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ConnectionComponent } from './Components/User/connection/connection.component';
import { InscriptionComponent } from './Components/User/inscription/inscription.component';

export const routes: Routes = [
    { path: '',   redirectTo: 'project-list', pathMatch: 'full' },
    // { path: 'project-component', component: ProjectComponent },
    { path: 'project-list', component: ProjectListComponent },
    // { path: 'wrapper-component', component: WrapperComponent },
    { path: 'tab/:id', component: WrapperListComponent },
    { path: 'connexion', component: ConnectionComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: '**', component: PageNotFoundComponent },
];
