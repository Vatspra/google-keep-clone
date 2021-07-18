import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REG_EX } from 'src/app/helpers/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(REG_EX.email)]),
    password: new FormControl('', Validators.required),
  });
  showLoader = false;
  controls: any;

  constructor() { 
    this.controls = this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  register() {
    //
  }

}
