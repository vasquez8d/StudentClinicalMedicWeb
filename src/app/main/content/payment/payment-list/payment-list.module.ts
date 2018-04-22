import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';

import { PaymentListComponent } from './payment-list.component';
import { PaymentListDetailsModule } from './dialog/payment-list-dialog.module';
import { PaymentListDetailsComponent } from './dialog/payment-list-dialog.component';
import { MatService } from '../../../../services/mat.service';

const routes: Routes = [
    {
        path: 'list',
        component: PaymentListComponent
    }
];

@NgModule({
    declarations: [
        PaymentListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        PaymentListDetailsModule,
        MomentModule,

        MatChipsModule
    ],
    providers: [
        MatService
    ],
    entryComponents: [
        PaymentListDetailsComponent,
    ]
})
export class PaymentListModule {
}
