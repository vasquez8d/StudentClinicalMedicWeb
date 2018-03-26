import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { UserModel } from '../../../../models/user.model';
import { GlobalUser } from '../../../../global/globaluser';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';

@Component({
    selector     : 'fuse-profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProfileComponent
{
    constructor(private globalUser: GlobalUser,
                private userModel: UserModel,
                private router: Router,
                private userService: UserService,
                private authloginService: AuthloginService )
    {

        const localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
        const sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');

        if (localsUserToken != null) {
            if (this.globalUser.user == null) {
                this.authloginService.getTokenUser(localsUserToken).subscribe(
                    success => {
                        if (success.res_service === 'ok') {
                            this.globalUser.user = success.data_result;
                            userService.getUserDetails(this.globalUser.user.user_id).subscribe(
                                successDetails => {
                                    if (successDetails.res_service === 'ok') {
                                        this.userModel.user = successDetails.data_result;
                                    } else {
                                        this.router.navigateByUrl('');
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        } else {
                            this.router.navigateByUrl('/auth/login');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }else{
                userService.getUserDetails(this.globalUser.user.user_id).subscribe(
                    successDetails => {
                        if (successDetails.res_service === 'ok') {
                            this.userModel.user = successDetails.data_result;
                        } else {
                            this.router.navigateByUrl('');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        } else if (sessionUserTooen != null) {
            if (this.globalUser.user == null) {
                this.authloginService.getTokenUser(sessionUserTooen).subscribe(
                    success => {
                        if (success.res_service === 'ok') {
                            this.globalUser.user = success.data_result;
                            userService.getUserDetails(this.globalUser.user.user_id).subscribe(
                                successDetails => {
                                    if (successDetails.res_service === 'ok') {
                                        this.userModel.user = successDetails.data_result;
                                    } else {
                                        this.router.navigateByUrl('');
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        } else {
                            this.router.navigateByUrl('/auth/login');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }else{
                userService.getUserDetails(this.globalUser.user.user_id).subscribe(
                    successDetails => {
                        if (successDetails.res_service === 'ok') {
                            this.userModel.user = successDetails.data_result;
                        } else {
                            this.router.navigateByUrl('');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        }   
    }
}
