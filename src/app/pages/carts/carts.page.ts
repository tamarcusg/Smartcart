import { Component, OnInit } from '@angular/core';
import {CartsProvider} from '../../providers/cart/cart'
import { NavController } from '../../../../node_modules/@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit {

  title: string 
  carts: any = []
  tempCart: any = []
  newCart: boolean = false;
  cartForm: FormGroup
  constructor(public navCtrl: NavController,
              public cartsProvider: CartsProvider,
              public authService: AuthService,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.title = "Carts"
    let userId: String = this.authService.user.id
    this.cartsProvider.getAllCarts().subscribe((data) =>{
    this.tempCart = data.carts
      for(let cart of this.tempCart){
        if(cart.userId == userId && cart.store == this.dataService.getStore() ){
          this.carts.push(cart)
        }
      }
    })
    this.cartForm = this.formBuilder.group({
      newCartName : ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  createCart(){
    this.newCart = true;
    this.title = "Create new Cart";
  }

  mapPage(){
    this.dataService.setCartName(this.cartForm.get('newCartName').value)
    console.log(this.dataService.getCartName())
    this.navCtrl.navigateRoot('/map')
  }
  
  cartDetails(id,name) {
    this.dataService.setId(id);
    this.dataService.setCartName(name);
    this.navCtrl.navigateRoot('/cart-items');
  }

  async destroyCart(id){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to permanently delete this cart?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cartsProvider.deleteCart(id).subscribe((data)=>{
              if(data.success){
                console.log("Data Success")
              }else{
                console.log("Error!")
              }
            });
            this.tempCart = [];
            for(let cart of this.carts){
              if(cart._id != id){
                this.tempCart.push(cart);
              }
            }
            this.carts = this.tempCart;
            console.log('Confirm Cancel');
          }
        }, {
          text: 'No',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  editCart(){

  }

}