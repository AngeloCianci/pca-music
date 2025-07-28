import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlServer= "https://music.fly.dev";

  constructor() { }

  checkloginEmail(email: any){
    return fetch(`${this.urlServer}/email/${email}`).then(
      response => response.json()
    );
  }

  checkloginPassword(password: any){
    return fetch(`${this.urlServer}/password/${password}`).then(
      response => response.json()
    );
  }


}
