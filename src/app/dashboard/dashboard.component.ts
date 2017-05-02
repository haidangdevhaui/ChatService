import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import { AuthStorage } from '../auth/auth.storage';
import '../../assets/js/app.min.js';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        '../../assets/css/AdminLTE.min.css',
        '../../assets/css/skin-red.css',
        './dashboard.component.css'
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public user;
    constructor(
        private router: Router,
        private _authSerivce: AuthService,
        private _authStorage: AuthStorage
    ) { }

    ngOnInit() { 
        if(!this._authStorage.check()){
            this.router.navigate(['/auth/sign-in']);
        }
        this.user = this._authStorage.user();
    }

    ngAfterViewInit(){
        
    }

}