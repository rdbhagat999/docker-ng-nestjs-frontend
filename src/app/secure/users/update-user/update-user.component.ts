import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/models';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  form: FormGroup;
  roles$: Observable<any[]>;
  user: User;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly route: ActivatedRoute, private readonly userService: UserService,
    private readonly roleService: RoleService) {
      this.roles$ = this.roleService.all();
      const id = this.route.snapshot.params.id;
      this.userService.get(id).subscribe((user: User) => {
        this.user = user;
        this.patchForm();
      });
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
      id: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  patchForm() {
    this.form.patchValue({
      ...this.user,
      roleId: this.user?.role?.id
    });
  }

  handleSubmit() {

    this.form.markAllAsTouched();

    console.log(this.form.status);

    if(this.form.valid) {

      console.log(this.form.value);

      this.userService.update(this.form.value.id, this.form.value)
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
