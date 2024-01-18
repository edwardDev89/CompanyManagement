import { Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { RegisterComponent } from './userLogin/register/register.component';
import { LoginComponent } from './userLogin/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company', component: CompanyListComponent, canActivate: [AuthGuardService]},
  // since using modal popup so this route navigation no longer needed
  // {
  //   path: 'company',
  //   canActivate: [AuthGuardService],
  //   children: [
  //     {
  //       path: '',
  //       canActivateChild: [AuthGuardService],
  //       children: [
  //         { path: '', component: CompanyListComponent },
  //         { path: 'add', component: AddCompanyComponent },
  //         { path: 'edit/:id', component: EditCompanyComponent },
  //       ],
  //     },
  //   ],
  // },
];
