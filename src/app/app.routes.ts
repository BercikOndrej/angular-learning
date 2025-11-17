import { Routes } from '@angular/router';
import { UserPage } from './users/user-page/user-page';
import { HomePage } from './home/home-page';

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
