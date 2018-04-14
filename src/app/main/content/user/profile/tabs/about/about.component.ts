import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { UserModel } from '../../../../../../models/user.model';
import { GlobalUser } from '../../../../../../global/globaluser';
import { UserService } from '../../../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthloginService } from '../../../../../../services/authlogin.service';
import { MomentModule } from 'angular2-moment';
import { Base64 } from 'js-base64';

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
                private activatedRoute: ActivatedRoute,
                private momentModule: MomentModule,
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
        this.activatedRoute.params.subscribe( params => {
            if ( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              this.userService.getUserDetailsUpdate(user_id).subscribe(
                    successGlobalDetails => {
                        this.userModel.user = successGlobalDetails.data_result;
                    },
                    error => {
                        console.log('error_loadGlobalUserDetials', error);
                    }
                );
            }
          });
    }
}
