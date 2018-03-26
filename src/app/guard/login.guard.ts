import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('tokenStudentClinicalAccessWS') != null){
      this.router.navigateByUrl('');
      return false;
    } else if (sessionStorage.getItem('tokenStudentClinicalAccessWS') != null){
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }
}
