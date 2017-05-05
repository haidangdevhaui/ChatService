import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { appRouting, routedComponent } from './dashboard.router';
import { Header } from './_partials/header';
import { SideBar } from './_partials/sidebar';
import { ChatService } from './chat-room/chat.service';
@NgModule({
    imports: [ 
        FormsModule,
        BrowserModule,
        appRouting
    ],
    declarations: [
        routedComponent,
        Header,
        SideBar
    ],
    providers: [ChatService]
})
export class DashboardModule { }