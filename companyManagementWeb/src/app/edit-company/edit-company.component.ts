import { Component, Input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { company } from '../../model/company.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { SignalService } from '../services/auth.service';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss',
})
export class EditCompanyComponent {
  @Input() companyId!: string;
  formSubmitted: boolean = false;
  companies: company[] = [];

  editCompanyForm = this.formBuilder.group({
    id: new FormControl({ value: null, disabled: true }),
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

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private signalService: SignalService
  ) {
    this.getCompanyList();
  }

  ngOnInit() {
    this.companyService.getCompany(this.companyId).subscribe({
      next: (res: any) => {
        this.editCompanyForm.patchValue({
          id: res['id'],
          name: res['name'],
          industry: res['industry'],
          city: res['city'],
          numberOfEmployees: res['numberOfEmployees'],
          parentCompanyId: res['parentCompanyId'],
        });
      },
      error: (err) => this.toastr.error(err.error),
    });
  }

  editCompany() {
    this.companyService
      .updateCompany(
        //this.router.snapshot.params['id'], // use for navigate page way
        this.companyId,
        this.editCompanyForm.value
      )
      .subscribe({
        next: () => {
          this.toastr.success('Company updated successfully'),
            this.signalService.updateSignal.set(true);
        },
        error: (err) => this.toastr.error(err.error),
      });

    this.modalService.dismissAll();
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.companyId).subscribe({
      next: () => {
        this.toastr.success('Company deleted successfully'),
          this.signalService.updateSignal.set(true);
      },
      error: (err) => this.toastr.error(err.error),
    });

    this.modalService.dismissAll();
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
