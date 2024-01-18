import { Component, DestroyRef, effect, inject } from '@angular/core';
import { company } from '../../model/company.model';
import { CompanyService } from '../services/company.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi, SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import { ButtonCellRenderer } from '../button-cell-renderer';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { SignalService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [RouterLink, AgGridAngular],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  destroyRef = inject(DestroyRef);
  rowData: company[] = [];
  gridApi!: GridApi;
  signalService = inject(SignalService);

  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
    type: 'fitCellContents',
  };

  colDefs: ColDef[] = [
    { field: 'id', filter: true },
    { field: 'name', filter: true },
    { field: 'industry', filter: true },
    { field: 'numberOfEmployees' },
    { field: 'city', filter: true },
    { field: 'parentCompany.name', filter: true },
    { field: 'level' },
    { cellRenderer: ButtonCellRenderer },
  ];

  constructor(private companyService: CompanyService, private modalService: NgbModal, private toastr: ToastrService) {}

  private changeDetection = effect(
    () => {
      if (this.signalService.updateSignal()) {
        this.companyService
          .getAllCompanies()
          .subscribe({
            next: (res) => {
              this.rowData = res;
              this.signalService.updateSignal.set(false);
            },
            error: (err) => {
              this.toastr.error(err);
            },
          });
      }
      
    },
    { allowSignalWrites: true }
  );

  openCreateModal(){
    this.modalService.open(AddCompanyComponent,{size:'xl',centered:true})
   }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.companyService
      .getAllCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.rowData = res;
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
  }
}
