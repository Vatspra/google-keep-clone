import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REG_EX } from 'src/app/helpers/constants';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(REG_EX.email)]),
    password: new FormControl('', Validators.required),
  });
  showLoader = false;
  controls: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.controls = this.registerForm.controls;
  }

  ngOnInit(): void {
  }

  register() {

    if(this.registerForm.valid) {
      const {email, password} = this.registerForm.value;
      const obj = {
        email: email.trim(),
        password: password.trim()
      }
      const user = this.authService.register(obj);
      if(user) {
        this.router.navigate(['/dashboard']);
        this.authService.openSnackbar('User created');
      } else {
        this.authService.openSnackbar('User already exists');
      }
    }
    //
  }

}
