import { Routes } from '@angular/router';
import { HomePage, UserPage } from './pages';

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
