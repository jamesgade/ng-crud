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
  public dashboardForm: FormGroup;
  userModel: UserModel = new UserModel();

  showAddButton: boolean;
  showUpdateButton: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.dashboardForm = this.formBuilder.group({
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
    this.dashboardForm.reset();
    this.showAddButton = true;
    this.showUpdateButton = false;
  }

  getUserList() {
    this.userService.getUser().subscribe(
      response => this.users = response
    );
  }

  add = () => {
    this.userModel.firstName = this.dashboardForm.value.firstName;
    this.userModel.lastName = this.dashboardForm.value.lastName;
    this.userModel.email = this.dashboardForm.value.email;
    this.userModel.password = this.dashboardForm.value.password;
    this.userModel.phone = this.dashboardForm.value.phone;
    this.userModel.isOver18 = this.dashboardForm.value.isOver18;
    this.userModel.gender = this.dashboardForm.value.gender;

    this.userService.addUser(this.userModel)
      .subscribe((response: any) => {
        let closeBtn = document.getElementById('cancel');

        this.dashboardForm.reset();
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

    this.dashboardForm.controls['firstName'].setValue(user.firstName);
    this.dashboardForm.controls['lastName'].setValue(user.lastName);
    this.dashboardForm.controls['email'].setValue(user.email);
    this.dashboardForm.controls['password'].setValue(user.password);
    this.dashboardForm.controls['phone'].setValue(user.phone);
    this.dashboardForm.controls['isOver18'].setValue(user.isOver18);
    this.dashboardForm.controls['gender'].setValue(user.gender);
  }

  update = () => {
    this.userModel.firstName = this.dashboardForm.value.firstName;
    this.userModel.lastName = this.dashboardForm.value.lastName;
    this.userModel.email = this.dashboardForm.value.email;
    this.userModel.password = this.dashboardForm.value.password;
    this.userModel.phone = this.dashboardForm.value.phone;
    this.userModel.isOver18 = this.dashboardForm.value.isOver18;
    this.userModel.gender = this.dashboardForm.value.gender;

    this.userService.updateUser(this.userModel, this.userModel.id)
    .subscribe(response => {
      let closeBtn = document.getElementById('cancel');

        this.dashboardForm.reset();
        closeBtn?.click();
        window.location.reload();
        this.getUserList();
    })
  }

  logout() {
    this.router.navigate(['login']);
  }

}
