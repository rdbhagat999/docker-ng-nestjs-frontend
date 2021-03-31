import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../public.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly route: ActivatedRoute, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      token: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      password_confirm: ['', []],
    }, {
      validators: [ConfirmedValidator]
    });
  }

  get f() {
    return this.form.controls;
  }

  patchForm() {

    const token = this.route.snapshot.params?.token;

    this.form.patchValue({
      token
    });

  }

  handleSubmit() {

    this.form.markAllAsTouched();

    console.log(this.form.status);

    this.patchForm();

    if(this.form.valid) {

      const data = Object.assign({}, this.form.value);

      this.authService.resetPassword(data)
      .subscribe((res) => {
        console.info('handleSubmit_response');
        this.router.navigate(['/login']);
      }, (error) => {
        console.error('handleSubmit_error');
      }, () => {
        console.info('handleSubmit_complete');
      }, );
    }

  }

}
