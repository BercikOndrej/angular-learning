import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService { 
  private readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  
  getAllUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.url);
  }
  
  getUser(id: number): Observable<User> { 
    return this.http.get<User>(`${this.url}/${id}`);
  } 

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  } 
  
  deleteUser(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.url}/${id}`);
  } 
}