import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './interfaces/message';
import { AuthStorage } from '../../auth/auth.storage';
import * as $ from 'jquery';
import '../../../assets/js/app.min.js';

export interface Client{
    clientID: String
}

export interface Boxs{
    [key: string]: Object[];
}


@Component({
    moduleId: module.id,
    selector: 'room',
    templateUrl: 'chat-room.component.html',
    styleUrls: ['chat-room.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class ChatRoomComponent implements OnInit {
    message: Message;
    messages: Message[];
    client: Client;
    clients: Client[];
    boxs: Boxs;
    watched: Object;
    admin;
    constructor(
        private _chatService: ChatService,
        private _authStorage: AuthStorage
    ) { 
        this.message = {
            clientID: '',
            timer: '',
            text: ''
        }
        this.clients = [];
        this.boxs = {};
        this.watched = {};
        this.admin = this._authStorage.user();
    }
    
    ngOnInit() { 
        this._chatService.connect().subscribe((message: Message) => {
            if(!this.checkClientExist(message.clientID)){
                this.clients.push({
                    clientID: message.clientID
                });
            }
            if(!this.boxs[message.clientID.toString()]){
                this.boxs[message.clientID.toString()] = [];
            }
            this.boxs[message.clientID.toString()].push(message);
            if(this.message.clientID != message.clientID){
                this.watched[message.clientID.toString()] = true;
            }
            $('.chat_area').animate({scrollTop: $('.chat_area').prop("scrollHeight")}, 'fast');
        })
    }

    chat(){
        this._chatService.send(this.message).then((message: Message) => {
            this.message.text = '';
            if(!this.boxs[message.clientID.toString()]){
                this.boxs[message.clientID.toString()] = [];
            }
            this.boxs[message.clientID.toString()].push(message);
            // this.watched[message.clientID.toString()] = true;
            $('.chat_area').animate({scrollTop: $('.chat_area').prop("scrollHeight")}, 'fast');
        });
    }

    checkClientExist(clientID){
        for(let i of this.clients){
            if(i.clientID == clientID){
                return true;
            }
        }
        return false;
    }

    getClientMessage(clientID){
        this._chatService.getMessagesByClientID(clientID).subscribe((messages) => {
            this.boxs[clientID] = messages;
            this.message.clientID = clientID;
            this.watched[clientID] = false;
        });
    }
}