import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'index',
    template: `
        <div class="text-center">
            <h3>Welcome to Chat Service fo web client</h3>
            <button class="btn btn-primary" [routerLink]="['auth/sign-in']">Sign in</button>
        </div>
    `
})
export class IndexComponent implements OnInit {

    constructor() { }

    ngOnInit() { 

    }

}