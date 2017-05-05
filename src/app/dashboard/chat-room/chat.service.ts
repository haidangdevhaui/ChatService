import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as io from 'socket.io-client';

import { Message } from './interfaces/message';

@Injectable()
export class ChatService {
    private socket;
    private socketUrl = 'http://localhost:3000/12345678';
    // private api_base = 'https://api-haidangdev.herokuapp.com/api/';
    private api_base = 'http://localhost:3000/api/';

    constructor(
        private _http: Http
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
            return this.socket.emit('AdminSendMessage', msg, function(message){
                return resolve(message);
            });
        });
        
    }

    connect(){
        let obs = new Observable(observer => {
            this.socket = io(this.socketUrl);
            this.socket.on('AdminReceivedMessage', (data) => {
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