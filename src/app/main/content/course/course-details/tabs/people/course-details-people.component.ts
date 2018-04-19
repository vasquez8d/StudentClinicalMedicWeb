import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-course-details-people',
    templateUrl: './course-details-people.component.html',
    styleUrls: ['./course-details-people.component.scss'],
    animations : fuseAnimations
})
export class CouseDetailsPeopleComponent
{
    timeline: any;

    constructor()
    {
    }
}
