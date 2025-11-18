import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './user-service';

@Injectable()
export class UserStore {
  private userService = inject(UserService);

  // State
  private loadedUsers = toSignal(this.userService.getAllUsers(), { initialValue: [] });
  users = linkedSignal(() => this.loadedUsers());
  selectedUser = signal<User | undefined>(undefined);

  // Actions
  selectUser(id: number) {
    const user = this.users().find(u => u.id === id);
    this.selectedUser.set(user);
  }

  deselectUser() {
    this.selectedUser.set(undefined);
  }

  createUser(user: Partial<User>) {
    this.userService.createUser(user).subscribe({
      next: (newUser) => {
        this.users.update(users => [newUser, ...users]);
        this.deselectUser();
      },
      error: (error) => console.error('Create user failed:', error)
    });
  }

  updateUser(id: number, user: Partial<User>) {
    this.userService.updateUser(id, user).subscribe({
      next: (updatedUser) => {
        this.users.update(users => users.map(u => u.id === id ? updatedUser : u));
        this.deselectUser();
      },
      error: (error) => console.error('Update user failed:', error)
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(users => users.filter(u => u.id !== id));
        if (this.selectedUser()?.id === id) {
          this.deselectUser();
        }
      },
      error: (error) => console.error('Delete user failed:', error)
    });
  }
}
