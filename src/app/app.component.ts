import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationSpanish } from './navigation/i18n/es';
import { GlobalUser } from './global/globaluser';
import { AuthloginService } from './services/authlogin.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private translate: TranslateService,
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private fuseTranslationLoader: FuseTranslationLoaderService,      
        
        private globalUser: GlobalUser,
        private authloginService: AuthloginService,
        private router: Router
    )
    {
        // Add languages
        this.translate.addLangs(['es', 'en']);

        // Set the default language
        this.translate.setDefaultLang('es');

        // Set the navigation translations
        this.fuseTranslationLoader.loadTranslations(navigationSpanish, navigationEnglish);

        // Use a language
        this.translate.use('es');

        const localsUserToken = localStorage.getItem('tokenStudentClinicalAccessWS');
        const sessionUserTooen = sessionStorage.getItem('tokenStudentClinicalAccessWS');
        
        if (localsUserToken != null) {
            if (this.globalUser.user == null) {
                this.authloginService.getTokenUser(localsUserToken).subscribe(
                    success => {
                        if (success.res_service === 'ok') {
                            this.globalUser.user = success.data_result;
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
    }
}
