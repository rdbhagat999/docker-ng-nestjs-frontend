import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../public.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  cls: string;
  message: string;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
      this.authService.forgotPassword(this.form.value)
      .subscribe((res: string) => {

        console.info('handleSubmit_response');

        this.cls = 'success';
        this.message = 'Email sent successfully!';

      }, (error) => {

        console.error('handleSubmit_error');

        this.cls = 'danger';
        this.message = 'Email does not exists!';

      }, () => {
        console.info('handleSubmit_complete');
      }, );
    }

  }

}
