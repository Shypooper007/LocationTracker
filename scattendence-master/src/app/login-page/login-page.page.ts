import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.page.html',
  styleUrls: ['login-page.page.scss'],
})
export class LoginPage implements OnInit {
  text = 'Hello World';

  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'Email is Incorrect' },
    ],
    password: [
      { type: 'required', message: 'Please enter your Password' },
      {
        type: 'minLength',
        message: 'The Password must be at least 5 chatacters or more',
      },
    ],
  };

  validationFormUser: FormGroup;
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authservice: AuthService
  ) {}
  ngOnInit(): void {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  loginUser(value) {
    console.log('As logged in');
    try {
      this.authservice.loginFireauth(value).then((resp) => {
        console.log(resp);

        if (resp.operationType === 'signIn') {
          console.log('hi');
          this.router.navigate(['/tabs','home']);
        }
      });
    } catch (err) {}
  }
}
