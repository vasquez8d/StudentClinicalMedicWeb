import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';

import { CourListModule } from './course-list/cour-list.module';
import { CourseCreateModule } from './course-create/course-create.module';
import { CourseIndexModule } from './course-index/course-index.module';
import { CourseService } from '../../../services/course.service';

import { MomentModule } from 'angular2-moment';
import { CorcategoryService } from '../../../services/corcategory.service';
import { CourseClassListModule } from './course-class-list/course-class-list.module';
import { CourseClassCreateModule } from './course-class-create/course-class-create.module';
import { ClassService } from '../../../services/class.service';

@NgModule({
    imports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,
        
        CourListModule,
        CourseCreateModule,
        CourseIndexModule,

        CourseClassListModule,
        CourseClassCreateModule,
        MomentModule
    ],
    providers: [
        CourseService,
        CorcategoryService,
        ClassService
    ]
})
export class CourseModule {
}
