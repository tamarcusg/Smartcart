import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private store: String
  private id:String
  private cart : any = [];
  private cartName: String

  constructor() { }

  setStore(storeName: String){
    this.store = storeName
  }

  getStore(){
    return this.store
  }

  setId(id: String){
    this.id = id
  }

  getId(){
    return this.id
  }

  setCart(cart:any) {
    this.cart = cart
  }

  getCart() {
    return this.cart
  }

  setCartName(name: string) {
    this.cartName = name;
  }

  getCartName() {
    return this.cartName
  }

}
