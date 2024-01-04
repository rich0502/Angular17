import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateProductService {

  stateProduct : any = {
     products : [],
     keyword : "",
     totalPages : 0,
     pageSize : 3,
     currentPage : 1,
     total : 0,
     checked : 0,
     status: "",
     errorMessage:""
  }
  constructor() {}

  public setStateProduct(state : any){
      this.stateProduct = {...this.stateProduct, ...state}
  }
}
