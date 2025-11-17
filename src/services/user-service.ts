import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService { 
  private readonly url = 'https://jsonplaceholder.typicode.com/users';
  
  constructor(private http: HttpClient) {}
  
  getAllUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.url).pipe(
      take(50),
      catchError(error => this.handleError(error))
    );
  }
  
  getUser(id: number): Observable<User> { 
    return this.http.get<User>(`${this.url}/${id}`).pipe(
      catchError(error => this.handleError(error))
    ); 
  } 
  
  updateUser() {

  } 
  
  deleteUser(id: number) { 
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(error => this.handleError(error))
    )
  } 
  
  private handleError(error: any): Observable<any> { 
    return throwError(() => error); 
  } 
}