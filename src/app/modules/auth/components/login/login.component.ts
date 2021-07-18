
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REG_EX } from 'src/app/helpers/constants';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(REG_EX.email)]),
    password: new FormControl('', Validators.required),
  });
  showLoader = false;
  controls: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.controls = this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  signIn() {
    if (this.loginForm.valid) {
      let { email, password } = this.loginForm.value;
      email = email.trim();
      password = password.trim();
      const userInfo = this.authService.signIn(email, password);
      if (userInfo) {
        this.router.navigate(['/dashboard']);
      }
    }
    //
  }

}
