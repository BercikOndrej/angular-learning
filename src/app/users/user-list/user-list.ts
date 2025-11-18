import { Component, input, output } from '@angular/core';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'user-list', 
  templateUrl: 'user-list.html',
  imports: [UserCard]
})

export class UserList {
  users = input.required<User[]>();

  selectUserEvent = output<number>();
  deleteUserEvent = output<number>();
}