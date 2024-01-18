import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginService } from '../../services/user-login.service';
import { SignalService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userLoginService: UserLoginService,
    private signalService: SignalService,
    private routerService: Router,
    private toastr: ToastrService
  ) {}

  registerForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerUser() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.userLoginService.register(this.registerForm.getRawValue()).subscribe({
        next: (res: any) => {
          localStorage.setItem('userToken', res.user.token);
          this.signalService.userSignal.set(res.user);
          this.routerService.navigate(['/']);
          this.toastr.success("Register Successfully!")
        },
        error: (err) => this.toastr.error(err.error.errors),
      });
    }
  }
}
