import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/models';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  roles$: Observable<any[]>;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly userService: UserService,
    private readonly roleService: RoleService) {
      this.roles$ = this.roleService.all();
     }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
    });

  }

  get f() {
    return this.form.controls;
  }

  handleSubmit() {

    this.form.markAllAsTouched();

    console.log(this.form.status);

    if(this.form.valid) {

      console.log(this.form.value);

      this.userService.create(this.form.value)
      .subscribe((res: User) => {

        // console.info('handleSubmitt_response', res);
        this.router.navigate(['/main/users']);

      }, (error) => {
        console.error('handleSubmitt_error');
      }, () => {
        console.info('handleSubmitt_complete');
      },);

    }

  }

}
