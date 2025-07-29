import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlServer = 'https://music.fly.dev';

  constructor(private http: HttpClient) { }

  httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      let params = {
        "user": credentials
      }
      console.log("params", params)
      this.http.post(`${this.urlServer}/login`, params, this.httpHeaders).subscribe(
        (data: any) => {
          console.log("data id = ", data.user)
          if (data.user.id != null) {
            accept(data);
          } else {
            reject(data.errors)
          }
        }
      )
    })
    }

  registroUser(userData: any) {
    let params = {
      "user": userData
    }
    return this.http.post(`${this.urlServer}/signup`, params, this.httpHeaders);

  }

  addfavoritos(fav: any) {
    return this.http.post(`${this.urlServer}/favoritos`, fav, this.httpHeaders);

  }

  delfavoritos(fav: any) {
    this.http.delete(`${this.urlServer}/favoritos`, fav);
  }

  async valfavoritos(fav: any): Promise<boolean> {
    try {
      await firstValueFrom(this.http.get(`${this.urlServer}/favoritos/${fav}`));
      return true; 
    } catch (error) {
      return false;
    }
  }
    
}
