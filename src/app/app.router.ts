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
        path: 'category',
        loadChildren: './main/content/category/category.module#CategoryModule',
    },
    {
        path: 'payment',
        loadChildren: './main/content/payment/payment.module#PaymentModule',
    },
    {
        path: '**',
        redirectTo: 'app/dashboard'
    }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
