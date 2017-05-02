import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private api_base = 'https://api-haidangdev.herokuapp.com/api/';
    constructor(private _http: Http) { }

    login(user){
        return this._http.post(this.api_base + 'auth', user)
        .map((response: Response) => response.json());
    }

    logOut(){
        return this._http.get(this.api_base + 'auth/logout')
        .map((response: Response) => response.json());
    }
}