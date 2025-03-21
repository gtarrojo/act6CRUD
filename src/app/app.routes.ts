import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/home/user-view/user-view.component';
import { UsersListComponent } from './pages/home/users-list/users-list.component';
import { UserFormComponent } from './pages/home/user-form/user-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', component: UsersListComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'user/:idUser', component: UserViewComponent },
      { path: 'newuser', component: UserFormComponent },
      { path: 'update/:idUser', component: UserFormComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
