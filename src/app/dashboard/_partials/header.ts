import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { AuthStorage } from '../../auth/auth.storage';

@Component({
    moduleId: module.id,
    selector: 'myHeader',
    templateUrl: 'header.html'
})
export class Header implements OnInit{
    public user;
    constructor(
        private router: Router,
        private _authSerivce: AuthService,
        private _authStorage: AuthStorage
    ) { }

    ngOnInit(){
        this.user = this._authStorage.user();
    }

    logout(){
        this._authSerivce.logOut().subscribe(() => {
            this._authStorage.forgot().then(() => {
                this.router.navigate(['/auth/sign-in']);
            });
        });
    }
}