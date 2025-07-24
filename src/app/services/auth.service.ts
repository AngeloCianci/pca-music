import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(credentials: any) {
    return new Promise((accept,reject) => {
      if (credentials.email === "angelo@gmail.com" && credentials.password === "123456") {
        accept("Login successful");
      }else {
        reject("Login failed");
      }
  })
}

  registroUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (credentials.email && credentials.password && credentials.nombre && credentials.apellido) {
        accept("Registration successful");
      } else {
        reject("Registration failed");
      }
    });
  }
}
