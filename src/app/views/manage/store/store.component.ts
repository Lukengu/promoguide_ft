import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../../services/stores.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploadService} from '../../../services/file-upload.service';
import {Store} from '../../../models/store.model';
import {MatDialogRef} from '@angular/material';
import {stores_image_path}  from  '../../../global';
import * as _ from  'lodash';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private storeService: StoresService,
              private formBuilder: FormBuilder,
              private fileUpload: FileUploadService,
              public matDialogRef: MatDialogRef<StoreComponent>) { }



  isCollapsed = false;
  iconCollapse = 'icon-arrow-up';
  storeGroups: Store[];
  store_form: FormGroup;
  logo = '';
  btn_css = 'fa-plus-square';
  dialog_title = 'Adding Store';

  ngOnInit() {
     this.storeService.getParentStore().subscribe(
      list => {
         this.storeGroups = list.map(item => {
           return {...item};
         });

         const s: Store = this.storeService.getStore();
         if (s  != null) {
          this.store_form.setValue(_.omit(s, ['id', 'business_id', 'lat', 'lng', 'area_code',
            'province', 'city', 'suburb', 'avatar', 'is_unique', 'created_at',  'updated_at']));
          this.logo = stores_image_path + '' + s.avatar;
          this.btn_css = 'fa-edit';
          this.dialog_title = `Editing ${s.parent_id} ${s.name} - ${s.shopping_center}`;
         }

      });

     this.store_form = this.formBuilder.group({
       parent_id: ['', Validators.required],
       name : ['', Validators.required],
       address : ['', Validators.required],
       shopping_center: [],
       tel_number: [],
       shop_number: [],
       store_representatives_name: ['', Validators.required],
       store_representatives_surname: ['',  Validators.required],
       store_representatives_email: ['', Validators.required && Validators.email],
       store_representatives_cell_no: [],
       operating_times_weekday_from: ['',  Validators.required],
       operating_times_weekday_to: ['',  Validators.required],
       operating_times_saturday_from: ['',  Validators.required],
       operating_times_saturday_to: ['',  Validators.required],
       operating_times_sunday_from: ['',  Validators.required],
       operating_times_sunday_to: ['',  Validators.required],
       operating_times_ph_from: ['',  Validators.required],
       operating_times_ph_to: ['',  Validators.required],

    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  getAddressOnChange(event) {
  }

  fileUploaded(event) {
  }

  onCloseOperation() {
    this.matDialogRef.close();
    this.storeService.initializeStore();
    this.logo = '';
    this.store_form.reset();
  }

}
