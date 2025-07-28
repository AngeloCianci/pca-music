import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  urlServer= "https://music.fly.dev";

  constructor(private http: HttpClient) { }

  addloginEmail(email: any){
    return this.http.post(`${this.urlServer}/datos/email/${email}`, {})
  }

  addloginPassword(password: any){
    return this.http.post(`${this.urlServer}/datos/password/${password}`, {})
  }

  addloginNombre(nombre: any){
    return this.http.post(`${this.urlServer}/datos/nombre/${nombre}`, {})
  }

  addloginApellido(apellido: any){
    return this.http.post(`${this.urlServer}/datos/apellido/${apellido}`, {})
  }
}
