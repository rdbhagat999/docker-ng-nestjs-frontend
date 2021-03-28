import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {

  endpoint = `${environment.apiURL}/api/users`;
  // private _users$: BehaviorSubject<User[]>;

  // users$: Observable<User[]>;

  constructor(protected readonly http: HttpClient) {
    super(http);
    // this._users$ = new BehaviorSubject([]);
    // this.users$ = this._users$.asObservable();
   }

  // all(): Observable<User[]> {
  //   return super.all();
  // }

  // get(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.endpoint}/${id}`);
  // }

  // create(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.endpoint}`, user);
  // }

  // update(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.endpoint}/${id}`, user);
  // }

  // delete(): Observable<void> {
  //   return this.http.delete<void>(`${this.endpoint}`);
  // }

}
