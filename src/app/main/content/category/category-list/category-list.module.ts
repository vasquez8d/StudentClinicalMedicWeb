import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MomentModule } from 'angular2-moment';
import { MatChipsModule } from '@angular/material';
import { CourseMaterialModule } from '../../course/course-material.module';


import { CategoryListComponent } from './category-list.component';

import { CategoryListDetailsModule } from './dialog/details/category-list-details.module';
import { CategoryListDetailsComponent } from './dialog/details/category-list-details.component';
import { CategoryListUpdateModule } from './dialog/update/category-list-update.module';
import { CategoryListUpdateComponent } from './dialog/update/category-list-update.component';
import { CategoryListCreateModule } from './dialog/create/category-list-create.module';
import { CategoryListCreateComponent } from './dialog/create/category-list-create.component';

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    }
];

@NgModule({
    declarations: [
        CategoryListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CourseMaterialModule,
        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        MomentModule,

        CategoryListDetailsModule,
        CategoryListUpdateModule,
        CategoryListCreateModule,
        
        MatChipsModule
    ],
    entryComponents: [
        CategoryListDetailsComponent,
        CategoryListUpdateComponent,
        CategoryListCreateComponent
    ]
})
export class CategoryListModule {
}
