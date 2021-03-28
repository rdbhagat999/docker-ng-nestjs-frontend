import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../public.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
    });
  }

  handleSubmit() {

    this.form.markAllAsTouched();

    console.log(this.form.status);

    if(this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value)
      .subscribe((res: User) => {

        console.info('login_function_response');
        this.router.navigate(['/main']);

      }, (error) => {
        console.error('login_function_error');
      }, () => {
        console.info('login_function_complete');
      }, );
    }

  }

}
