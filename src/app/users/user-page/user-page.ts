import { Component, inject, OnInit, signal } from '@angular/core';
import { UserList } from '../user-list/user-list';
import { UserService } from '../../../services/user-service';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'user-page',
  templateUrl: 'user-page.html',
  imports: [UserList, UserForm]
})

export class UserPage implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  selected = signal<User | undefined>(undefined);

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(list => list.filter(user => user.id !== id));
      } ,
      error: (error) => console.log(error)
    })
  }

  selectUser(id: number) {
    this.selected.update(prev => this.users().find(user => user.id === id) ?? undefined);
  }

  createUser(user: Partial<User>) {
    this.userService.createUser(user).subscribe({
      next: (newUser) =>  this.users.update(users => [newUser, ...users]),
      error: (error) => console.log(error)
    })
  }

  updateUser({ id, user }: { id: number, user: Partial<User> }) {
    this.userService.updateUser(id, user).subscribe({
      next: (updatedUser) =>  {
        this.users.update(users => users.map(u => u.id === id ? updatedUser : u));
        this.selected.set(undefined);
      },
      error: (error) => console.log(error)
    })
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.log(error)
    })
   }
}