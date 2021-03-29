import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, Role } from 'src/app/models/models';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {


  form: FormGroup;
  permissions: any[];
  role: Role;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly route: ActivatedRoute, private readonly roleService: RoleService,
    private readonly permissionService: PermissionService) {


    this.permissionService.all().subscribe((permissions: Permission[]) => {
      this.permissions = permissions;
      this.loadPermissions();
    });

    const id = this.route.snapshot.params.id;

    this.roleService.get(id).subscribe((role: Role) => {
      this.role = role;
      this.patchForm();
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: ['', [Validators.required,]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]],
      permissionIds: this.fb.array([]),
    });

  }

  get f() {
    return this.form.controls;
  }

  get permissionArray(): FormArray {
    return this.form.get('permissionIds') as FormArray;
  }

  patchForm() {
    const selectedPermissions = this.permissions.map(p => {
      return {
        id: p.id,
        name: p.name,
        value: this.role.permissions.find(itt => itt.id == p.id) ? true : false
      }
    });

    this.form.patchValue({
      id: this.role?.id,
      name: this.role?.name,
      permissionIds: selectedPermissions
    });
  }

  loadPermissions() {
    this.permissions.forEach((p,i) => {
      this.addPermission(p);
    });
  }

  addPermission(permission: Permission) {
    this.permissionArray.push(
      this.fb.group({
        id: permission.id,
        name: permission.name,
        value: false
      })
    );
  }

  removePermission(index: number) {
    this.permissionArray.removeAt(index);
  }

  handleSubmit() {

    this.form.markAllAsTouched();

    console.log(this.form.status);

    if(this.form.valid) {

      const fv = Object.assign({}, this.form.value);
      fv.permissionIds = fv.permissionIds.filter(p => p.value == true).map(p => p.id);

      this.roleService.update(fv.id, fv)
      .subscribe((role: Role) => {

        console.info('handleSubmitt_response');
        this.router.navigate(['/main/roles']);

      }, (error) => {
        console.error('handleSubmitt_error');
      }, () => {
        console.info('handleSubmitt_complete');
      },);

    }

  }

}
