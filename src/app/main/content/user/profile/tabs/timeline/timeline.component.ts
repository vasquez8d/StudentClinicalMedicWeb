import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls  : ['./timeline.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileTimelineComponent
{
    timeline: any;

    constructor()
    {
    }
}
