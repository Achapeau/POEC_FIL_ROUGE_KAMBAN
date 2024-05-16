import { Routes } from '@angular/router';
import { WrapperListComponent } from './Components/Wrapper/wrapper-list/wrapper-list.component';
import { ProjectListComponent } from './Components/Project/project-list/project-list.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ConnectionComponent } from './Components/User/connection/connection.component';
import { InscriptionComponent } from './Components/User/inscription/inscription.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  {
    path: 'project-list',
    component: ProjectListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'project',
    component: WrapperListComponent,
    canActivate: [authGuard],
  },
  { path: 'connexion', component: ConnectionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: '**', component: PageNotFoundComponent },
];
