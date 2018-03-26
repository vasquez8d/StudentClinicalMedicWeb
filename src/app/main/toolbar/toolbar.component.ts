import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthloginService } from '../../services/authlogin.service';
import { GlobalUser } from '../../global/globaluser';
import * as crypto from 'crypto-js';
import { GlobalValues } from '../../global/globalvalues';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;

    user = {
        user_seg_nom : '',
        user_pri_nom : ''
    };

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private sidebarService: FuseSidebarService,
        private translate: TranslateService,
        private authloginService: AuthloginService,
        private globalUser: GlobalUser,
        private globalValues: GlobalValues
    )
    {
        const localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
        const sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');

        if (localsUserToken != null) {
            if (this.globalUser.user == null) {
                this.authloginService.getTokenUser(localsUserToken).subscribe(
                    success => {
                        if (success.res_service === 'ok') {
                            this.globalUser.user = success.data_result;
                            this.user = this.globalUser.user;
                        } else {
                            this.router.navigateByUrl('/auth/login');
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
                            this.user = this.globalUser.user;
                        } else {
                            this.router.navigateByUrl('/auth/login');
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        }
        
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'es',
                'title': 'Español',
                'flag' : 'es'
            },
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });

    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }

    logout(){
        if (this.authloginService.logout()){
            this.router.navigateByUrl('/auth/login');
        }
    }

    navigateToProfile(){
        const pwEncrypt = crypto.AES.encrypt(this.globalUser.user.user_id.toString(), this.globalValues.cryptoKey());
        const encryptUser = pwEncrypt.toString().replace('/', '_');
        this.router.navigate(['user/' + encryptUser + '/profile']);
    }

    navigateToCourses(){

    }

    navigateToNotifications(){
        
    }

    navigateToChat(){
        this.router.navigate(['app/chat']);
    }
}
