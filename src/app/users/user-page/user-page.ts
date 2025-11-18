import { Component, inject } from '@angular/core';
import { UserStore } from '../../services/user-store';
import { UserForm } from '../user-form/user-form';
import { UserList } from '../user-list/user-list';

@Component({
  selector: 'user-page',
  templateUrl: 'user-page.html',
  imports: [UserList, UserForm],
  providers: [UserStore]
})

export class UserPage {
  protected userStore = inject(UserStore);
}