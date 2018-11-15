import {Component, OnInit, ViewChild} from '@angular/core';
import {StoresService} from '../../services/stores.service';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import {stores_image_path} from  '../../global';
import {StoreComponent} from './store/store.component';
import {Store} from '../../models/store.model';



@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',

})
export class StoresComponent implements OnInit {

  searchKey: string;
  stores_image_path: string = stores_image_path;
  store_list: MatTableDataSource<any>;
  matDialogConfig: MatDialogConfig = new MatDialogConfig();


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'parent_id',
    'shopping_center',
    'address',
    'tel_number',
    'avatar',
    'actions'

  ];
  constructor(private storesService: StoresService,  private dialog: MatDialog) {
    this.matDialogConfig.disableClose = true;
    this.matDialogConfig.autoFocus = true;
    this.matDialogConfig.width = '75%';
  }

  ngOnInit() {
    this.storesService.getStores().subscribe(
      list => {
        const array = list.map(
            item => {
             // console.log(item);
              return {...item};
            });
        this.store_list = new MatTableDataSource(array);
        this.store_list.sort = this.sort;
        this.store_list.paginator = this.paginator;
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.store_list.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.dialog.open(StoreComponent, this.matDialogConfig);
  }

  onEdit(item: Store) {
    this.storesService.setStore(item);
    this.dialog.open(StoreComponent, this.matDialogConfig);
  }

}
