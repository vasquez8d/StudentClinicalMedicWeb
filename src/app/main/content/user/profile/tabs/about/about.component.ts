import { Component, OnInit } from '@angular/core';

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
export class FuseProfileAboutComponent implements OnInit
{
    about: any;
    user: any;

    constructor(private profileService: ProfileService,
                private globalUser: GlobalUser,
                private userService: UserService,
                private userModel: UserModel,
                private router: Router,
                private authloginService: AuthloginService)
    {
        this.profileService.aboutOnChanged.subscribe(about => {
            this.about = about;
        });
    }

    ngOnInit() {
        this.loadGlobalUserDetials();
    }

    loadGlobalUserDetials() {
        // console.log('tab_profile');
        this.userService.getGlobalUserDetails().subscribe(
            successGlobalDetails => {
                // console.log(successGlobalDetails.data_result);
                this.userModel.user = successGlobalDetails.data_result;
            },
            error => {
                console.log(error);
            }
        );
    }
}
