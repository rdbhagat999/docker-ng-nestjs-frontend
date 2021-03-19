import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy  {

  private apiURL = environment.apiURL;

  private _user$: BehaviorSubject<User>;
  user$: Observable<User>;

  private userSubscription: Subscription;

  constructor(private readonly http: HttpClient) {
    this._user$ = new BehaviorSubject(null);
    this.user$ = this._user$.asObservable();
    this.user();
   }

   authUser(user: (User | null) = null) {
    this._user$.next(user);
   }

  register(userData: User) {
    return this.http.post(`${this.apiURL}/api/register`, {...userData});
  }

  login(userData: User) {
    return this.http.post(`${this.apiURL}/api/login`, {...userData}, { withCredentials: true });
  }

  user() {
    this.userSubscription = this.http.get(`${this.apiURL}/api/user`, { withCredentials: true })
    .subscribe((res: User) => {
      this.authUser(res);
    }, (error) => {

    }, () => {

    });
  }

  logout() {
    return this.http.post(`${this.apiURL}/api/logout`, {}, { withCredentials: true });
  }

  ngOnDestroy() {
    try {
      this.userSubscription.unsubscribe();
    } catch (error) {

    }
  }

}
