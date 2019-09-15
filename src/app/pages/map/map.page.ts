import { Component, OnInit } from '@angular/core';
import { MapProvider } from '../../providers/map/map'
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { CartsProvider } from '../../providers/cart/cart'
import {AuthService} from '../../services/auth.service'
import {DataService} from '../../services/data.service'


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  map: any = []
  products: any = []
  name: any = String
  productsResultArr: any = []
  items: any;
  searchTerm: String = ""
  userCart: any = []
  user: any
  height: any = Number
  width: any = Number
  size: any = Number
  images: any = []
  grid: Array<Array<string>>
  sliderCheck: number = 1

  constructor(public mapProvider: MapProvider, public navCtrl: NavController,
              public authService: AuthService,public cartsProvider: CartsProvider,public dataService: DataService) { }

  ngOnInit() {
    this.mapProvider.getRemoteMap("map").subscribe((data) => {
      this.map = data.map;
      this.name = data.name;
      this.size = data.size;
      this.height = data.height;
      this.width = data.width;
      this.grid = new Array(new Array(this.height + 1));
      this.images = new Array(this.size); 
      for(let i = 0; i < this.map.length;i++){
        for(let j of this.map[i].items){
          if(!this.products.includes(j) && j != "None")
          {
            this.products.push(j)
          }
        }
      }
    })

    this.setFilteredItems
    this.user = this.authService.user
    
  }

  filteredItems(searchTerm){
    return this.products.filter(item => {
      return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    })
  }
  setFilteredItems(){
    this.items = this.filteredItems(this.searchTerm);
  }

  addToCart(item: any){
    if(!this.userCart.includes(item)){
      this.searchTerm = "";
      this.userCart.push(item)
    }
  }

  sendData(){
    let obj = {
      userId: this.user.id
      ,
      name: this.dataService.getCartName(),
      product: this.userCart,
      date: Date.now(),
      store: this.dataService.getStore()
    }
    this.cartsProvider.createCart(obj).subscribe((data) => {
      if(data.success){
        this.dataService.setId(data.id);
        console.log("Data Success")
      }
      else{
        console.log("Error when adding cart")
      }
    });

    //this.navCtrl.navigateRoot("/carts");
  }

  goToMap() {
    this.sendData()
    this.navCtrl.navigateRoot("/path");
  }

  changeSlider() {
    this.sliderCheck = (this.sliderCheck*(-1));
  }
}
