import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.html'
})

export class UserList implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  selected = signal<User | null>(null);

  ngOnInit() { 
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.log(error)
    })
  }
}