import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginService } from '../../services/user-login.service';
import { SignalService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userLoginService: UserLoginService,
    private signalService: SignalService,
    private routerService: Router,
    private toastr: ToastrService
  ) {}

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    if (localStorage.getItem('userToken') !== null) {
      this.routerService.navigate(['company']);
    }
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.userLoginService.login(this.loginForm.getRawValue()).subscribe({
        next: (res: any) => {
          localStorage.setItem('userToken', res.user.token);
          this.signalService.userSignal.set(res.user);
          this.routerService.navigate(['company']);
          this.toastr.success('Login Successfully!');
        },
        error: (err) => this.toastr.error(err),
      });
    }
  }
}
