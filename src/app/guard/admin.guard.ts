import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthloginService } from '../services/authlogin.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authLoginService: AuthloginService) { }
//     canActivate(
//         next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean>| boolean {

//         // return this.authLoginService.getTokenUserLoged((auth) => {
//         //     if (auth) {
//         //         console.log('authenticated');
//         //         return true;
//         //     }
//         //     console.log('not authenticated');
//         //     this.router.navigateByUrl('/login');
//         //     return false;
//         // }).first();

//         return this.authLoginService.getTokenUserLogedObs((auth) => {
//             if (auth) {
//                 console.log('authenticated');
//                 return true;
//             }
//             console.log('not authenticated');
//             this.router.navigateByUrl('/login');
//             return false;
//         }).first();
//     }
// }
