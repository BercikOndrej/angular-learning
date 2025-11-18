import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../services/user-store';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.html',
  imports: [ReactiveFormsModule]
})

export class UserForm {
  private formBuilder = inject(FormBuilder);
  private userStore = inject(UserStore);
  
  selectedUser = input<User>();

  // Without validator massages
  userProfile = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    website: ['', Validators.required],
    company: this.formBuilder.group({
      name: ['', Validators.required],
    })
  })
  
  constructor() {
    effect(() => {
      const user = this.selectedUser();
      if (user) {
        this.userProfile.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: {
            name: user.company.name
          }
        });
      }
    })
  }

  onSubmit() {
    if(this.selectedUser()) {
      this.userStore.updateUser(
        this.selectedUser()!.id,
        this.userProfile.value as Partial<User>
      );
    }
    else {
      this.userStore.createUser(this.userProfile.value as Partial<User>);
    }
    this.userProfile.reset();
  }
}