import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  users: any = [];
  public addUserForm: FormGroup;
  userModel: UserModel = new UserModel();

  showAddButton: boolean;
  showUpdateButton: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      phone: [''],
      isOver18: [''],
      gender: ['']
    })

    this.getUserList();
  }

  clickAddNewUser() {
    this.addUserForm.reset();
    this.showAddButton = true;
    this.showUpdateButton = false;
  }

  getUserList() {
    this.userService.getUser().subscribe(
      response => this.users = response
    );
  }

  add = () => {
    this.userModel.firstName = this.addUserForm.value.firstName;
    this.userModel.lastName = this.addUserForm.value.lastName;
    this.userModel.email = this.addUserForm.value.email;
    this.userModel.password = this.addUserForm.value.password;
    this.userModel.phone = this.addUserForm.value.phone;
    this.userModel.isOver18 = this.addUserForm.value.isOver18;
    this.userModel.gender = this.addUserForm.value.gender;

    this.userService.addUser(this.userModel)
      .subscribe((response: any) => {
        let closeBtn = document.getElementById('cancel');

        this.addUserForm.reset();
        closeBtn?.click();
        this.getUserList();
      })
  }

  delete = (id: number) => {
    this.userService.deleteUser(id)
    .subscribe(response => {
      this.getUserList();
    })
  }

  edit = (user: any) => {
    this.userModel.id = user.id;

    this.showAddButton = false;
    this.showUpdateButton = true;

    this.addUserForm.controls['firstName'].setValue(user.firstName);
    this.addUserForm.controls['lastName'].setValue(user.lastName);
    this.addUserForm.controls['email'].setValue(user.email);
    this.addUserForm.controls['password'].setValue(user.password);
    this.addUserForm.controls['phone'].setValue(user.phone);
    this.addUserForm.controls['isOver18'].setValue(user.isOver18);
    this.addUserForm.controls['gender'].setValue(user.gender);
  }

  update = () => {
    this.userModel.firstName = this.addUserForm.value.firstName;
    this.userModel.lastName = this.addUserForm.value.lastName;
    this.userModel.email = this.addUserForm.value.email;
    this.userModel.password = this.addUserForm.value.password;
    this.userModel.phone = this.addUserForm.value.phone;
    this.userModel.isOver18 = this.addUserForm.value.isOver18;
    this.userModel.gender = this.addUserForm.value.gender;

    this.userService.updateUser(this.userModel, this.userModel.id)
    .subscribe(response => {
      let closeBtn = document.getElementById('cancel');

        this.addUserForm.reset();
        closeBtn?.click();
        window.location.reload();
        this.getUserList();
    })
  }

  logout() {
    this.router.navigate(['login']);
  }

}
