import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { UserModel } from '../../../../../../models/user.model';
import { GlobalUser } from '../../../../../../global/globaluser';
import { UserService } from '../../../../../../services/user.service';
import { Router } from '@angular/router';
import { AuthloginService } from '../../../../../../services/authlogin.service';

@Component({
    selector   : 'fuse-profile-about',
    templateUrl: './about.component.html',
    styleUrls  : ['./about.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileAboutComponent
{
    about: any;

    constructor(private profileService: ProfileService,
                private userModel: UserModel,
                private globalUser: GlobalUser,
                private userService: UserService,
                private router: Router,
                private authloginService: AuthloginService)
    {
        this.profileService.aboutOnChanged.subscribe(about => {
            this.about = about;
        });

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
