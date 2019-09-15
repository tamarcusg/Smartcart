import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CartsProvider {
    
    url = environment.url;
    constructor(public http: Http, public authService: AuthService) {

    }

    createCart(obj){
        return this.http.post(this.url+"/api/cart/create",obj) //use this when dev return this.http.post(ep, patient,{headers: headers})
        .map(res => res.json());
    }

    getCartById(id){
        return this.http.get(this.url+"/api/cart/user/"+id) //use this when dev return this.http.post(ep, patient,{headers: headers})
        .map(res => res.json());          
    }

    getAllCarts(){
        return this.http.get(this.url+"/api/carts/all/") //use this when dev return this.http.post(ep, patient,{headers: headers})
        .map(res => res.json());  
    }
   

    deleteCart(id){
        return this.http.delete(this.url+"/api/cart/delete/"+id).map(res => res.json());
    }

    updateCart(id,obj){
        return this.http.put(this.url+"/api/cart/update/"+id,obj).map(res => res.json());
    }

    



}