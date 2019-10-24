import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongUserError: string = '';

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = fb.group({
      email: ['framheimcerveceria@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['framheim357', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.
      login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        this.router.navigate(['main-panel']);
      })
      .catch(e => {
        if (e.code === 'auth/user-not-found') {
          this.wrongUserError = e.message;
        }
      });
  }

}
