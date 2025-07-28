import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  urlServer= "https://music.fly.dev";

  constructor(private http: HttpClient) { }

}
