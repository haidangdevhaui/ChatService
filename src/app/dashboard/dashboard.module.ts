import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRouting, routedComponent } from './dashboard.router';
import { Header } from './_partials/header';
import { SideBar } from './_partials/sidebar';

@NgModule({
    imports: [ 
        BrowserModule,
        appRouting
    ],
    declarations: [
        routedComponent,
        Header,
        SideBar
    ]
})
export class DashboardModule { }