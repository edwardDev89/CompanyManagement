import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { company } from '../../model/company.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignalService } from '../services/auth.service';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss',
})
export class AddCompanyComponent {
  formSubmitted: boolean = false;
  companies: company[] = [];
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private signalService: SignalService
  ) {
    this.getCompanyList();
  }

  companyForm = this.formBuilder.group({
    name: ['', Validators.required],
    industry: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\-]*$/)]],
    numberOfEmployees: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    parentCompanyId: [null],
  });

  ngOninit() {}

  addCompany() {
    this.formSubmitted = true;
    if (this.companyForm.valid) {
      this.companyService.addCompany(this.companyForm.value).subscribe({
        next: () => {
          this.toastr.success('Company added successfully.'),
            this.signalService.updateSignal.set(true);
        },
        error: (err) => this.toastr.error(err.error),
      });
      this.modalService.dismissAll();
    }
  }

  getCompanyList() {
    this.companyService.getAllCompanies().subscribe({
      next: (res) => {
        this.companies = res;
      },
      error: (err) => this.toastr.error(err.error),
    });
  }
}
