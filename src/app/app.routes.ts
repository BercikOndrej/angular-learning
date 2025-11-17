import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page';
import { UserPage } from './pages/users/user-page';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: HomePage
  },
  {
    path: 'users',
    title: 'User Page',
    component: UserPage
  }
];
