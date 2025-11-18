import { Component, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../services/user-service';
import { UserForm } from '../user-form/user-form';
import { UserList } from '../user-list/user-list';

@Component({
  selector: 'user-page',
  templateUrl: 'user-page.html',
  imports: [UserList, UserForm]
})

export class UserPage {
  private userService = inject(UserService);

  loadedUsers = toSignal(this.userService.getAllUsers(), { initialValue: [] });
  users = linkedSignal(() => this.loadedUsers());
  
  selected = signal<User | undefined>(undefined);

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.users.update(list => list.filter(user => user.id !== id)),
      error: (error) => console.error(error)
    })
  }

  selectUser(id: number) {
    this.selected.update(prev => this.users().find(user => user.id === id) ?? undefined);
  }

  createUser(user: Partial<User>) {
    this.userService.createUser(user).subscribe({
      next: (newUser) =>  this.users.update(users => [newUser, ...users]),
      error: (error) => console.error(error)
    })
  }

  updateUser({ id, user }: { id: number, user: Partial<User> }) {
    this.userService.updateUser(id, user).subscribe({
      next: (updatedUser) =>  {
        this.users.update(users => users.map(u => u.id === id ? updatedUser : u));
        this.selected.set(undefined);
      },
      error: (error) => console.error(error)
    })
  }
}