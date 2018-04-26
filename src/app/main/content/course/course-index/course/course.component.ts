import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';

import { CourseIndexService } from '../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { AuthloginService } from '../../../../../services/authlogin.service';

@Component({
    selector     : 'fuse-academy-course',
    templateUrl  : './course.component.html',
    styleUrls    : ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CourseIndexComponent implements OnInit, OnDestroy, AfterViewInit
{
    course: any;
    courseSubscription: Subscription;
    currentStep = 0;
    courseStepContent;
    animationDirection: 'left' | 'right' | 'none' = 'none';
    totalSteps: any;
    user_id: any;
    cor_name: any = '';

    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private courseService: CourseIndexService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authLoginService: AuthloginService
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to courses
        this.courseSubscription =
            this.courseService.onCourseChanged
                .subscribe(course => {
                    this.course = course.data_result;
                    this.totalSteps = course.data_result.length;
                    if (course.data_result.length > 0){
                        this.cor_name = course.data_result[0].cor_name;
                    }
                });

        this.authLoginService.getTokenUserLoged().subscribe(
            success => {
                this.user_id = success.data_result.user_id;
            }, err => {
                console.log(err);
            }
        );
    }

    backToCourses(){
        const encryptUser = Base64.encode(this.user_id.toString());
        this.router.navigate(['course/' + encryptUser + '/info']);
    }

    ngAfterViewInit()
    {
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.element.nativeElement.id === 'course-step-content';
        });
    }

    ngOnDestroy()
    {
        this.courseSubscription.unsubscribe();
    }

    gotoStep(step)
    {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    gotoNextStep()
    {
        if ( this.currentStep === this.course.totalSteps - 1 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    // getSecureUrl(url){
    //     console.log(this.domSanitizationService.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + url));
    //     return this.domSanitizationService.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + url);        
    // }

    gotoPreviousStep()
    {
        if ( this.currentStep === 0 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }
}
