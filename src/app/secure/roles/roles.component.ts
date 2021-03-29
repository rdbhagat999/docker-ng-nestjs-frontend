import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/models';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles$: Observable<Role[]>;

  constructor(private readonly roleService: RoleService) {
    this.nextPage();
   }

  ngOnInit(): void {}

  nextPage() {
    this.roles$ = this.roleService.nextPage();
  }

  prevPage() {
    this.roles$ = this.roleService.prevPage();
  }

  handleDelete(id: number) {
    this.roleService.delete(id).subscribe(_ => this.nextPage());
  }

}
