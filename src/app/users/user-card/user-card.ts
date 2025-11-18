import { Component, inject, input } from '@angular/core';
import { UserStore } from '../../services/user-store';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.html',
})

export class UserCard {
  private userStore = inject(UserStore);
  
  user = input.required<User>();

  deleteUser() {
    this.userStore.deleteUser(this.user().id);
  }

  selectUser() {
    this.userStore.selectUser(this.user().id);
  }
}