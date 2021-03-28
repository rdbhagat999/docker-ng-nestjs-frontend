import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private readonly userService: UserService) {
    this.nextPage();
   }

  ngOnInit(): void {}

  nextPage() {
    this.users$ = this.userService.nextPage();
  }

  prevPage() {
    this.users$ = this.userService.prevPage();
  }

  handleDelete(id: number) {
    this.userService.delete(id).subscribe(_ => this.nextPage());
  }

}
