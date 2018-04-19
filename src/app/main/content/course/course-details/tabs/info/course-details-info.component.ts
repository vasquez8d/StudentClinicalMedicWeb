import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { UserModel } from '../../../../../../models/user.model';
import { GlobalUser } from '../../../../../../global/globaluser';
import { UserService } from '../../../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthloginService } from '../../../../../../services/authlogin.service';
import { MomentModule } from 'angular2-moment';
import { Base64 } from 'js-base64';

@Component({
    selector   : 'fuse-course-details-info',
    templateUrl: './course-details-info.component.html',
    styleUrls: ['./course-details-info.component.scss'],
    animations : fuseAnimations
})
export class CourseDetailsInfoComponent implements OnInit
{
    about: any;
    user: any;

    constructor(private globalUser: GlobalUser,
                private userService: UserService,
                private userModel: UserModel,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private momentModule: MomentModule,
                private authloginService: AuthloginService)
    {
    }

    ngOnInit() {

        this.loadGlobalUserDetials();
    }

    navigateMyCourses() {
        this.activatedRoute.params.subscribe(params => {
            if (params.user_id) {
                const user_id = Base64.decode(params.user_id);
                const encryptUser = Base64.encode(user_id.toString());
                this.router.navigate(['course/' + encryptUser + '/info']);
            }
        });
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
