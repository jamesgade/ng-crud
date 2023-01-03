import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginFormFields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password'
    }
  ];

  constructor(private router: Router, private authService: AuthService) { }

  login = (formValues: any) => {
    this.authService.loginUser()
      .subscribe(response => {
        const user = response.find((userData: any) => formValues.email === userData.email && formValues.password === userData.password)
        if (user) {
          this.router.navigate(['dashboard']);
        } else {
          alert('Invalid credentials');
        }
      })
  }




  // public userLoginForm: FormGroup;

  // constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  // ngOnInit(): void {
  //   this.userLoginForm = this.formBuilder.group({
  //     email: [''],
  //     password: ['']
  //   })
  // }

  // login = () => {
  //   this.authService.loginUser()
  //     .subscribe(response => {
  //       const user = response.find((userData: any) => this.userLoginForm.value.email === userData.email && this.userLoginForm.value.password === userData.password)
  //       if (user) {
  //         this.router.navigate(['dashboard']);
  //       } else {
  //         alert('Invalid credentials');
  //       }
  //     })
  // }

}
