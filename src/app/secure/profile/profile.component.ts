import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  infoForm: FormGroup;
  pwdUpdateForm: FormGroup;

  user: User;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthService) {
    this.authService.user$.subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.pwdUpdateForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      password_confirm: ['', []],
    }, {
      validators: [ConfirmedValidator],
      updateOn: 'blur'
    });

    this.patchForm();
  }

  patchForm() {
    this.infoForm.patchValue({
      ...this.user
    });
  }

  get infoF() {
    return this.infoForm.controls;
  }

  get pwdF() {
    return this.pwdUpdateForm.controls;
  }

  handleInfoSubmit() {

    this.infoForm.markAllAsTouched();

    console.log(this.infoForm.status);

    if(this.infoForm.valid) {
      console.log(this.infoForm.value);
      this.authService.updateInfo(this.infoForm.value)
      .subscribe((res: User) => {

        console.info('handleInfoSubmit_response');
        this.router.navigate(['/main/users']);

      }, (error) => {
        console.error('handleInfoSubmit_error');
      }, () => {
        console.info('handleInfoSubmit_complete');
      }, );
    }

  }

  handlePasswordUpdate() {

    this.pwdUpdateForm.markAllAsTouched();

    console.log(this.pwdUpdateForm.status);
    console.log(this.pwdUpdateForm.errors);

    if(this.pwdUpdateForm.valid) {
      console.log(this.pwdUpdateForm.value);
      this.authService.updatePassword(this.pwdUpdateForm.value)
      .subscribe((res: User) => {

        console.info('handlePasswordUpdate_response');
        this.router.navigate(['/main/users']);

      }, (error) => {
        console.error('handlePasswordUpdate_error');
      }, () => {
        console.info('handlePasswordUpdate_complete');
      }, );
    }

  }

}
