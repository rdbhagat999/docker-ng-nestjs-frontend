import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy  {

  private apiURL = environment.apiURL;

  private _user$: BehaviorSubject<User>;
  user$: Observable<User>;

  private userSubscription: Subscription;

  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly route: ActivatedRoute) {
    this._user$ = new BehaviorSubject(null);
    this.user$ = this._user$.asObservable();

    this.user();

   }

  setAuthUser(user: User) {
    this._user$.next(user);
  }

  register(userData) {
    return this.http.post<User>(`${this.apiURL}/api/register`, {...userData});
  }

  login(userData) {
    return this.http.post<User>(`${this.apiURL}/api/login`, {...userData});
  }

  user(): void {
    this.userSubscription = this.http.get<User>(`${this.apiURL}/api/user`)
    .subscribe((user: User) => {

      this.setAuthUser(user?.id ? user : null);

      if(user?.id) {
        this.router.navigate(['/main']);
      } else {
        this.router.navigate(['/login']);
      }

    }, error => {
      this.router.navigate(['/login']);
    });
  }

   async checkUser(): Promise<User> {
    return await this.http.get<User>(`${this.apiURL}/api/user`)
    .toPromise();
  }

  updateInfo(userData): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/api/users/info`, userData).pipe(
      tap(() => this.user())
    );
  }

  updatePassword(userData): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/api/users/password`, userData);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/api/logout`, {});
  }

  ngOnDestroy() {
    try {
      this.userSubscription.unsubscribe();
    } catch (error) {

    }
  }

}
