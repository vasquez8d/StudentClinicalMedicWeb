import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { UserModel } from '../../../../models/user.model';
import { GlobalUser } from '../../../../global/globaluser';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { AuthloginService } from '../../../../services/authlogin.service';
import { Base64 } from 'js-base64';

@Component({
    selector     : 'fuse-profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProfileComponent implements OnInit
{

    bIsUser: boolean = false;
    vCurrentUser: '';

    constructor(private globalUser: GlobalUser,
                private userModel: UserModel,
                private router: Router,
                private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private authloginService: AuthloginService )
    {   
    }

    ngOnInit() {
        this.loadGlobalUserDetials();
    }

    loadGlobalUserDetials() {
        this.userService.getGlobalUserDetails().subscribe(
            successGlobalDetails => {
                this.userModel.user = successGlobalDetails.data_result;
                this.validateIsUser();
            },
            error => {
                console.log(error);
            }
        );
    }

    validateIsUser(){
        this.activatedRoute.params.subscribe( params =>{
            if( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              if(user_id == this.userModel.user.user_id){
                this.bIsUser = true;
              }
            }
          })
    }

    routeEditProfile(){
        const encryptUser = Base64.encode(this.globalUser.user.user_id.toString());
        this.router.navigate(['user/' + encryptUser + '/update']);
    }
}
