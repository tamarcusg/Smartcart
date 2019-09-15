import { Component, OnInit } from '@angular/core';
import {CartsProvider} from '../../providers/cart/cart'
import { NavController } from '../../../../node_modules/@ionic/angular';
import { NavParams } from '../../../../node_modules/@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.page.html',
  styleUrls: ['./cart-items.page.scss'],
})
export class CartItemsPage implements OnInit {

  id: any = String;
  items: any = [];
  tempCart: any;
  correctCart: any;
  userCart: any=[];
  tempItems: any = [];
  cartName: String

  constructor(public navCtrl: NavController,public cartsProvider: CartsProvider,
    public dataService: DataService) {
    
  }

  ngOnInit() {
    this.cartName = this.dataService.getCartName()
    this.cartsProvider.getAllCarts().subscribe((data) =>{
      this.tempCart = data.carts
        for(let cart of this.tempCart){
          this.id = this.dataService.getId();
          if(cart._id == this.id){
            this.correctCart = cart;
          }
        }
        
        if (this.correctCart != null) {
          for (let item of this.correctCart.product) {
            this.items.push(item);
          }
        } else {
          this.items.push("Error: cart is null! Id: " + this.dataService.getId());
        }
      })

      
  }

  goToMap() {
    this.navCtrl.navigateRoot("/path");
  }

  //Remove item may need to be removed
  removeItem(toBeRemoved: any){
    this.tempItems = [];
    for(let item of this.items){
      if(item != toBeRemoved){
        this.tempItems.push(item);
      }
    }

    this.items = this.tempItems;

    let obj = {product: this.items};
    this.cartsProvider.updateCart(this.id, obj).subscribe((data)=>{
      if(data.success){
        console.log("Data Success, baby.")
      }else{
        console.log("Oh... that ain't good. Something didn't go right.")
      }
    });
  }

}
