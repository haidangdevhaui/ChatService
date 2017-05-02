import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthStorage } from './auth.storage';

@Component({
    moduleId: module.id,
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {

    constructor(
        private router: Router,
        private _authStorage: AuthStorage
    ) { }

    ngOnInit() { 
        if(this._authStorage.check()){
            this.router.navigate(['/dashboard']);
        }else{
            this.router.navigate(['/auth/sign-in']);
        }
    }

}