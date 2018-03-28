import { Component, ViewEncapsulation, OnInit } from '@angular/core';

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
export class FuseProfileComponent implements OnInit
{
    constructor(private globalUser: GlobalUser,
                private userModel: UserModel,
                private router: Router,
                private userService: UserService,
                private authloginService: AuthloginService )
    {   
    }

    ngOnInit() {
        this.loadGlobalUserDetials();
    }

    loadGlobalUserDetials() {
        console.log('profile');
        this.userService.getGlobalUserDetails().subscribe(
            successGlobalDetails => {
                console.log(successGlobalDetails.data_result);
                this.userModel.user = successGlobalDetails.data_result;
            },
            error => {
                console.log(error);
            }
        );
    }
}
