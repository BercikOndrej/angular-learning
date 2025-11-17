import { Component, inject, OnInit, signal } from '@angular/core';
import { UserList } from '../user-list/user-list';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.html',
  imports: [UserList]
})

export class UserPage implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  selected = signal<User | null>(null);

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(list => list.filter(user => user.id !== id));
      } ,
      error: (error) => console.log(error)
    })
  }

  selectUser(id: number) {
    this.selected.update(prev => this.users().find(user => user.id === id) ?? null);
    console.log(this.selected());
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.log(error)
    })
   }
}