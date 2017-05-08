import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as io from 'socket.io-client';

import { Message } from './interfaces/message';
import { AuthStorage } from '../../auth/auth.storage';

@Injectable()
export class ChatService {
    private socket;
    private socketUrl = 'http://localhost:3000/chat_service';
    // private api_base = 'https://api-haidangdev.herokuapp.com/api/';
    private api_base = 'http://localhost:3000/api/';

    constructor(
        private _http: Http,
        private _authStorage: AuthStorage
    ){

    }

    send(msg){
        let d = new Date();
        msg.timer = (d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours()) 
                + ':' 
                + (d.getMinutes().toString().length == 1 ? '0'+d.getMinutes(): d.getMinutes()) 
                + ':' 
                + (d.getSeconds().toString().length == 1 ? '0'+d.getSeconds(): d.getSeconds());
        return new Promise((resolve, reject) => {
            return this.socket.emit(`AdminSendMessage${this._authStorage.user()._id}`, msg, function(message){
                return resolve(message);
            });
        });
        
    }

    connect(){
        let obs = new Observable(observer => {
            this.socket = io(this.socketUrl, {query: `AdminID=${this._authStorage.user()._id}&AdminName=${this._authStorage.user().fullname}&AdminAvatar=${this._authStorage.user().avatar}&isAdmin=true`});
            this.socket.on(`AdminReceivedMessage${this._authStorage.user()._id}`, (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        })
        return obs;
    }

    getMessagesByClientID(clientID): Observable<Message[]>{
        return this._http.get(this.api_base + 'chat-service/messages/' + clientID)
        .map((response: Response) => <Message[]> response.json());
    }

}