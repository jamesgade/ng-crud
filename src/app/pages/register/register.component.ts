import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  registerFormFields = [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstName',
      required: true
    },
    {
      label: 'Last Name',
      type: 'text',
      name: 'lastName',
      required: true,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      required: true
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      required: true,
      minLength: 8
    },
    {
      label: 'Phone Number',
      type: 'number',
      name: 'Phone',
      required: true
    },
    {
      label: 'Is Adult?',
      type: 'checkbox',
      name: 'isOver18'
    },
    {
      label: 'Select Gender',
      type: 'radio',
      name: 'gender',
      required: true,
      options: [
        {
          label: 'Male',
          value: 'male',
          name: 'male'
        },
        {
          label: 'Female',
          value: 'female',
          name: 'female'
        }
      ]
    },
    {
      label: 'Occupation',
      type: 'select',
      name: 'occupation',
      required: true,
      options: [
        {
          label: 'I am a student',
          value: 'student'
        },
        {
          label: 'Freelancer',
          value: 'freelancer'
        },
        {
          label: 'Self Employed',
          value: 'self-employed'
        },
      ]
    }
  ]

  constructor(private router: Router, private authService: AuthService) { }

  register = (values: any) => {
    this.authService.registerUser(values)
      .subscribe(response => {
        this.router.navigate(['login']);
      })
  }

  // public userRegistrationForm: FormGroup;

  // constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  // ngOnInit(): void {
  //   this.userRegistrationForm = this.formBuilder.group({
  //     firstName: [''],
  //     lastName: [''],
  //     email: [''],
  //     password: [''],
  //     phone: [''],
  //     isOver18: [''],
  //     gender: ['']
  //   })
  // }

  // register = () => {
  //   this.authService.registerUser(this.userRegistrationForm.value)
  //     .subscribe(response => {
  //       this.userRegistrationForm.reset();
  //       this.router.navigate(['login']);
  //     })
  // }

}
