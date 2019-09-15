import { Component, OnInit } from '@angular/core';
import { MapProvider } from '../../providers/map/map'
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { CartsProvider } from '../../providers/cart/cart'
import {AuthService} from '../../services/auth.service'
import {DataService} from '../../services/data.service'
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-path',
  templateUrl: './path.page.html',
  styleUrls: ['./path.page.scss'],
})
export class PathPage implements OnInit {

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
  entranceXCord : any = Number
  entranceYCord : any = Number
  entrances : any = []
  entranceIndex : any = Number
  checkouts : any = []
  path : any []
  tempCart : any []
  id: any
  itemPoints : any = []

  constructor(public mapProvider: MapProvider, public navCtrl: NavController,
              public authService: AuthService,public cartsProvider: CartsProvider,public dataService: DataService) { }

   ngOnInit() {
    
    this.mapProvider.getRemoteMap("map").subscribe((data) => {

      this.entranceXCord = 0;
      this.entranceYCord = 0;
      this.entranceIndex = 0;
      this.map = data.map;
      this.name = data.name;
      this.size = data.size;
      this.height = data.height;
      this.width = data.width;
      this.grid = new Array(new Array(this.height + 1));
      this.images = new Array(this.size);

      this.getItemPoints();

    setTimeout(() => {let rowNum = 0; //counter to iterate over the rows in the grid
    let imageIter = 0;

    this.makeEntranceBank();
    this.moveEntrance();
    this.makeImageBank();
  
    for (rowNum; rowNum <= this.height; rowNum++) { //iterate images
  
      this.grid[rowNum] =  new Array(this.width); //declare two elements per row

      for (let j = 0; j <= this.width; j++) {
        this.grid[rowNum][j] = this.images[imageIter];
        imageIter++;
      }
    }}, 1000);
    })

    this.user = this.authService.user
    
  }

  makeEntranceBank() {
    for (let cell of this.map) {
      if (cell.entrance) {
        this.entrances.push(cell);
      }
    }
  }

  makeCheckoutBank() {
    for (let cell of this.map) {
      if (cell.checkout) {
        this.checkouts.push(cell);
      }
    }
  }

  makeImageBank() {
    
    let i = 0;
    for (let cell of this.map) {
      if (cell.entrance) {
        this.images[i] = "../../../assets/imgs/EntranceSquare.png";
      }
      else if (cell.checkout) {
        this.images[i] = "../../../assets/imgs/CheckoutSquare.png";
      }
      else if (!cell.traverse) {
        this.images[i] = "../../../assets/imgs/AisleSquare.png";
      }
      else {
        let flag = true;
        for (let point of this.itemPoints) {
          if (point.xCord == cell.xCord && point.yCord == cell.yCord) {
            flag = false;
            this.images[i] = "../../../assets/imgs/PathSquare.png"
          }
        }
        if (flag) {
          this.images[i] = "../../../assets/imgs/EmptySquare.png";
          
        }
      }
      i +=1;
    }
  }

  moveEntrance() {
    if (this.entranceIndex == this.entrances.length) {
      this.entranceIndex = 0;
    } 
    this.entranceXCord = this.entrances[this.entranceIndex].xCord;
    this.entranceYCord = this.entrances[this.entranceIndex].yCord;
    this.entranceIndex++;  
  }

  createPath() {
    let startPoint = [this.entranceXCord, this.entranceYCord];
    let focus = startPoint;
    this.path.push(startPoint);
    while (this.userCart.length > 0) {
      let shortest = this.size;
      for (let cell of this.itemPoints) {
        if (Math.abs((focus[0] - cell.xCord) + (focus[1] - cell.yCord)) < shortest) {
          shortest = Math.abs((focus[0] - cell.xCord) + (focus[1] - cell.yCord));

        }
      }

    }
  }

  getItemPoints() {
     this.cartsProvider.getAllCarts().subscribe((data) =>{
      this.tempCart = data.carts
      this.id = this.dataService.getId();
      
        for(let cart of this.tempCart){
          if(cart._id == this.id){
            
            this.userCart = cart;
            
          }
        }
      
        this.itemPoints = [];
        let cartIter = 0;
        for (let cell of this.map) {
          for (let item of cell.items) {
            if (this.userCart.product.indexOf(item) > -1) {
              this.itemPoints.push(cell);
              
            }
          }
        }
        
      })
    
  }

}
