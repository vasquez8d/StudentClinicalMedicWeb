import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';

import { ExamStartService } from './exam-start.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'fuse-exam-start',
    templateUrl: './exam-start.component.html',
    styleUrls: ['./exam-start.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExamStartComponent implements OnInit, OnDestroy, AfterViewInit {
    course: any;
    courseSubscription: Subscription;
    currentStep = 0;
    courseStepContent;
    animationDirection: 'left' | 'right' | 'none' = 'none';
    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private courseService: ExamStartService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
    }

    ngOnInit() {
        // Subscribe to courses
        this.courseSubscription =
            this.courseService.onCourseChanged
                .subscribe(course => {
                    this.course = course;
                    console.log(this.course);
                });
    }

    ngAfterViewInit() {
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.element.nativeElement.id === 'course-step-content';
        });
    }

    ngOnDestroy() {
        this.courseSubscription.unsubscribe();
    }

    gotoStep(step) {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this.changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    gotoNextStep() {
        if (this.currentStep === this.course.totalSteps - 1) {
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

    gotoPreviousStep() {
        if (this.currentStep === 0) {
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

    finalizeExam(){
        Swal({
            title: '¿Estas seguro de terminar el examen?',
            text: 'No se puede revertir esta acción.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ya terminé.',
            cancelButtonText: 'No, aún no termino.'
        }).then((result) => {
            if (result.value) {
                Swal({
                    title: '¡Examen terminado!',
                    text: 'Felicidades, terminaste el examen.',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar',
                }).then((resultAcept) => {
                    this.router.navigateByUrl('/exam');
                });
            }
        });
    }
}
