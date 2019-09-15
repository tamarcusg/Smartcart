import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()

export class MapProvider {
    constructor(public http: Http) {}

    getRemoteMap(name){
       return this.http.get('../../../assets/data/'+name+'.json').map(res => res.json())
    }
}