import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api_path} from '../global';
import {AuthService} from './auth.service';
import {Store} from '../models/store.model';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private store: Store = null;
  private store_url: string = api_path + 'user/stores/';
  private parent_store: string = api_path + 'user/stores/parent/';

  constructor(private http: HttpClient, authservice: AuthService) {
    const permissions: string[] = authservice.getCurrentUser().permissions;
    if (permissions.indexOf('admin') === -1 ) {
      this.store_url = this.store_url + authservice.getCurrentUser().id;
      this.parent_store = this.parent_store + authservice.getCurrentUser().id;
    }
  }

  public getStores(): Observable<Store[]> {
    return this.get(this.store_url);
  }
  public getParentStore(): Observable<Store[]> {
    return this.get(this.parent_store);
  }

  private get(url: string): Observable<Store[]> {
    return this.http.get<Store[]>(url);
  }

  public setStore(store: Store) {
    this.store = store;
  }

  public getStore(): Store | null {
    return this.store;
  }

  public initializeStore(): void {
    this.store = null;
  }

}
