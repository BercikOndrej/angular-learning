import { Component, OnInit } from '@angular/core';
import { UserList } from '../../users/user-list/user-list';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.html',
  imports: [UserList]
})

export class UserPage implements OnInit {
  constructor() { }

  ngOnInit() { }
}