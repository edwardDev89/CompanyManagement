import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignalService } from './services/auth.service';
import { UserLoginService } from './services/user-login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'companyManagement';
  signalService = inject(SignalService);
  constructor(private userLoginService: UserLoginService, private routerService:Router) {}

  ngOnInit(){
    this.userLoginService.getUser().subscribe({
      next: (res:any) =>{this.signalService.userSignal.set(res.user)},
      error: (err) => {this.signalService.userSignal.set(null)}
    });
  }

  logout(){
    localStorage.setItem('userToken','')
    this.signalService.userSignal.set(null)
    this.routerService.navigate(['login'])
  }
}
