import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignIn } from './sign-in';
import { Message } from '../message';
import { AuthService } from '../auth.service';
import { AuthStorage } from '../auth.storage';

@Component({
    moduleId: module.id,
    selector: 'signin',
    styleUrls: ['../auth.component.css'],
    templateUrl: 'sign-in.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
    user: UserSignIn;
    message: Message;
    constructor(
        private _authService: AuthService, 
        private _authStorage: AuthStorage,
        private router: Router
    ) { 
        this.user = {
            email: '',
            password: ''
        }
    }

    login(){
        this._authService.login(this.user).subscribe((response) => {
            if(response.error){
                this.message = {
                    type: 'danger',
                    text: response.message
                }
                return;
            }
            if(response.token){
                this.message = {
                    type: 'success',
                    text: 'Login successfully!'
                }
                this._authStorage.store(response.token).then(() => {
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1500)
                });
            }
        });
    }

    ngOnInit() { 
        
    }

}