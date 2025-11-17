import { Component, input, output } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.html',
})

export class UserCard {

  user = input.required<User>();
  deleteUserEvent = output<number>();
  selectUserEvent = output<number>();

  deleteUser() {
    this.deleteUserEvent.emit(this.user()!.id);
  }

  selectUser() {
    this.selectUserEvent.emit(this.user()!.id);
  }
}