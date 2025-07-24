import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})

export class IntroGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  async canActivate(){
    const visto = await this.storageService.get('Visto');
    if ( visto === true) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
      return false;
    }
  }
}

