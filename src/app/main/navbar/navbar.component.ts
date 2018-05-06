import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthloginService } from '../../services/authlogin.service';
import { GlobalUser } from '../../global/globaluser';
import { Router } from '@angular/router';

@Component({
    selector     : 'fuse-navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent implements OnDestroy
{
    private fusePerfectScrollbar: FusePerfectScrollbarDirective;

    @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this.fusePerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.fusePerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;

    constructor(
        private sidebarService: FuseSidebarService,
        private navigationService: FuseNavigationService,
        private navigationData: NavigationService,
        private authloginService: AuthloginService,
        private globalUser: GlobalUser,
        private router: Router
    )
    {
        this.authloginService.getTokenUserLoged().subscribe(
            success => {
                // tslint:disable-next-line:triple-equals
                if (success.res_service == 'ok'){
                    this.globalUser.user = success.data_result;
                    this.navigation = navigationData.getNavigation(this.globalUser.user);
                }else{
                    this.router.navigateByUrl('/auth/login');
                }
            }, err => {
                console.log(err);
                this.router.navigateByUrl('/auth/login');
            }
        );        
        this.layout = 'vertical';
    }

    ngOnDestroy()
    {
        if ( this.fusePerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        if ( this.navigationServiceWatcher )
        {
            this.navigationServiceWatcher.unsubscribe();
        }
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    toggleSidebarFolded(key)
    {
        this.sidebarService.getSidebar(key).toggleFold();
    }
}
