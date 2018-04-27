import { NgModule } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, 
    FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';
    
import { ExamIndexModule } from './exam-index/exam-index.module';
import { ExamStartModule } from './exam-start/exam-start.module';
import { TestService } from '../../../services/test.service';

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

        ExamIndexModule,
        ExamStartModule
    ],
    providers: [
        TestService
    ]
})

export class ExamModule {

}
