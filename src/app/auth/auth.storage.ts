import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
export class AuthStorage {
    jwtHelper: JwtHelper = new JwtHelper();

    store(token){
        localStorage.setItem('jwtToken', token);
        return new Promise((resolve, reject) => {
            resolve();
        })
    }

    check(){
        return localStorage.getItem('jwtToken') != null && tokenNotExpired('jwtToken');
    }

    forgot(){
        localStorage.removeItem('jwtToken');
        return new Promise((resolve, reject) => {
            resolve();
        })
    }

    user(){
        if(this.check()){
            return this.jwtHelper.decodeToken(localStorage.getItem('jwtToken'))._doc;
        }
        return null;
    }
}
