import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { authRouting, routedComponents } from './auth.router';
import { AuthService } from './auth.service';
import { AuthStorage } from './auth.storage';
import { RequestOptions, Http } from "@angular/http";

@NgModule({
    declarations: [ 
        routedComponents
    ],
    imports: [ 
        BrowserModule,
        FormsModule,
        authRouting
    ],
    providers: [
        AuthStorage,
        AuthService
    ]
})
export class AuthModule{}