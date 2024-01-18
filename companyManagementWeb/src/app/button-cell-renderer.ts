import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, GridApi } from 'ag-grid-community';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        (click)="openEditModal()"
      >
        Edit
      </button>
    </div>
  `,
})


export class ButtonCellRenderer implements ICellRendererAngularComp {
  public params!: ICellRendererParams;
  public gridApi!: GridApi;
  private modalService: NgbModal = new NgbModal;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  openEditModal(){
   const modelRef = this.modalService.open(EditCompanyComponent,{size:'xl',centered:true})
   modelRef.componentInstance.companyId = this.params.data.id
  }
}
