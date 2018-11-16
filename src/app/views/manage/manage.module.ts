import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import {
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';




// Dropdowns Component


// Buttons Routing
import { ManageRoutingModule } from './manage-routing.module';
import { StoresComponent } from './stores.component';
import {StoreComponent} from './store/store.component';
import {SharedModule} from '../../shared/shared.module';




// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    CollapseModule.forRoot(),
    NgSelectModule,
    SharedModule,
    MatCheckboxModule
  ],
  declarations: [
    StoresComponent,
    StoreComponent,
  ],
  entryComponents: [
    StoreComponent
  ]
})
export class ManageModule { }
