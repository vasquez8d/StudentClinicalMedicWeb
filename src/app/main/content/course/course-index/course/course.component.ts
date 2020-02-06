import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';

import { CourseIndexService } from '../course.service';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { AuthloginService } from '../../../../../services/authlogin.service';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../../../../../services/comments.service';

@Component({
    selector     : 'fuse-academy-course',
    templateUrl  : './course.component.html',
    styleUrls    : ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
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

    starsCount: number;

    user: any;
    user_photo: any = '';

    @ViewChild('replyForm') replyForm: NgForm;
    
    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private courseService: CourseIndexService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authLoginService: AuthloginService,
        private commentService: CommentsService
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to courses
        this.courseSubscription =
            this.courseService.onCourseChanged
                .subscribe(course => {
                    console.log(course);
                    this.course = course.data_result;
                    this.totalSteps = course.data_result.length;
                    if (course.data_result.length > 0){
                        this.cor_name = course.data_result[0].cor_name;
                    }
                });

        this.authLoginService.getTokenUserLoged().subscribe(
            success => {
                this.user = success.data_result;
                this.user_id = success.data_result.user_id;
                this.user_photo = success.data_result.user_reg_provider_photo;
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

    rateModify($event){
        console.log($event);
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

    addComent(class_id){
        const message = {
            user_full_name          : this.user.user_pri_nom + ' ' + this.user.user_ape_pat,            
            com_text                : this.replyForm.form.value.message,
            fec_registro            : new Date().toISOString(),
            user_reg_provider_photo : this.user.user_reg_provider_photo
        };

        if (message.com_text.trim() !== ''){
            for (let i = 0; i < this.course.length; i++) {
                if (this.course[i].class_id === class_id) {
                    if (this.course[i].coments == null) {
                        this.course[i]['coments'] = [
                            message
                        ];
                    } else {
                        this.course[i].coments.push(message);
                    }
                }
            }
            this.replyForm.reset();
            
            const comRegister = {
                com_text: message.com_text,
                com_user_id: this.user.user_id,
                class_id : class_id,
                usu_registro : 'web'
            };

            this.commentService.postCategoryRegister(comRegister).subscribe(
                success => {
                    console.log(success);
                }, err => {
                    console.log(err);
                }
            );
        }
    }
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
