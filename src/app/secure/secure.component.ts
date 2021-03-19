import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  user: Observable<User>;

  constructor(private readonly authService: AuthService) {
    this.user = this.authService.user$
  }

  ngOnInit(): void {
  }

  handleLogout(event: string) {
    this.authService.logout().subscribe();
  }

}
