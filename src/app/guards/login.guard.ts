import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  async canActivate(){
    const Login = await this.storageService.get('Login');
    if ( Login === true) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
