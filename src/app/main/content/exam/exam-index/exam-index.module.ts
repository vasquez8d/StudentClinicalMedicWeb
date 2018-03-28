import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';

import { ExamIndexComponent } from './exam-index.component';
import { ExamIndexKpiComponent } from './tabs/exam-index-kpi/exam-index-kpi.component';
import { ExamIndexListComponent } from './tabs/exam-index-list/exam-index-list.component';

const routes: Routes = [
    {
        path: '',
        component: ExamIndexComponent
    }
];

@NgModule({
    declarations: [
        ExamIndexComponent,
        ExamIndexKpiComponent,
        ExamIndexListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseHighlightModule,
    ],
})
export class ExamIndexModule {
}
