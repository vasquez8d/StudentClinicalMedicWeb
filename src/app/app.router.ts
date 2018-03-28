import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const APP_ROUTES: Routes = [
    {
        path: 'app',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path: 'ui',
        loadChildren: './main/content/ui/ui.module#FuseUIModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'services',
        loadChildren: './main/content/services/services.module#FuseServicesModule'
    },
    {
        path: 'components',
        loadChildren: './main/content/components/components.module#FuseComponentsModule'
    },
    {
        path: 'components-third-party',
        loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule'
    },
    {
        path: 'user',
        loadChildren: './main/content/user/user.module#UserModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './main/content/auth/auth.module#AuthModule',
        canActivate: [LoginGuard]
    },
    {
        path: 'course',
        loadChildren: './main/content/course/course.module#CourseModule',
    },
    {
        path: 'exam',
        loadChildren: './main/content/exam/exam.module#ExamModule',
    },
    {
        path: '**',
        redirectTo: 'app/dashboard'
    }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
