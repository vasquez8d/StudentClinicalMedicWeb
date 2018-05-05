import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { QuesService } from '../../../../services/questions.service';
import { TestService } from '../../../../services/test.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import * as moment from 'moment';

@Component({
    selector: 'fuse-exam-start',
    templateUrl: './exam-start.component.html',
    styleUrls: ['./exam-start.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExamStartComponent implements OnInit, AfterViewInit {
    
    questions: any = [];
    currentStep = 0;
    courseStepContent;
    totalSteps: any = 0;
    animationDirection: 'left' | 'right' | 'none' = 'none';

    questionFormArray: FormArray;
    questionForm: FormGroup;

    subTimer: Subscription;
    countdown: any;

    test_num_ques: any;
    test_id: any;

    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private testService: TestService,
        private formBuilder: FormBuilder,
    ) {
        this.countdown = {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        };
    }

    ngOnInit() {
        this.questionFormArray = new FormArray(
            [
            ]
        );
        this.questionForm = new FormGroup(
            {
                questions: this.questionFormArray
            }
        );
        this.checkTestStatus();
    }

    checkTestStatus(){
        this.activatedRouter.params.subscribe(params => {
            if (params.test_id) {
                this.test_id = Base64.decode(params.test_id);
                this.testService.getTestStatus(this.test_id).subscribe(
                    success => {
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok'){
                            // tslint:disable-next-line:triple-equals
                            if (success.data_result.test_status == '1'){
                                this.loadQuestions();
                            }else{
                                this.router.navigateByUrl('/exam');
                            }
                        }else{
                            this.router.navigateByUrl('/exam');
                        }
                    }, err => {
                        console.log(err);
                        this.router.navigateByUrl('/exam');
                    }
                );
            }
        });
    }

    loadQuestions() {
        this.activatedRouter.params.subscribe(params => {
            if (params.test_num_ques && params.test_type_id && params.test_id && params.test_categ_slug) {
                this.test_num_ques = Base64.decode(params.test_num_ques);
                const test_type_id = Base64.decode(params.test_type_id);
                this.test_id = Base64.decode(params.test_id);
                const data = {
                    test_type_id: test_type_id,
                    test_num_ques: this.test_num_ques
                };
                this.testService.postTestQuestions(data).subscribe(
                    success => {
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok') {
                            this.questions = success.data_result;
                            this.totalSteps = success.data_result.length;

                            this.questions.forEach(element => {
                                const formGroup = this.formBuilder.group(
                                    {
                                        ques_question: element.ques_question,
                                        ques_id: element.ques_id,
                                        ques_res1: element.ques_res1,
                                        ques_res2: element.ques_res2,
                                        ques_res3: element.ques_res3,
                                        ques_res4: element.ques_res4,
                                        ques_res5: element.ques_res5,
                                        ques_ok: element.ques_ok,
                                        ques_select: ''
                                    }
                                );
                                this.questionFormArray.push(formGroup);

                                this.questionForm = new FormGroup(
                                    {
                                        'questions': this.questionFormArray
                                    }
                                );
                            });
                            this.startCountDown(Base64.decode(params.ques_time));
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    startCountDown(time){
        const currDate = moment();
        const eventDate = moment().add(time, 'minutes');

        let diff = eventDate.diff(currDate, 'seconds');

        const countDown =
            Observable
                .interval(1000)
                .map(value => {
                    return diff = diff - 1;
                })
                .map(value => {
                    const timeLeft = moment.duration(value, 'seconds');

                    return {
                        days: timeLeft.asDays().toFixed(0),
                        hours: timeLeft.hours(),
                        minutes: timeLeft.minutes(),
                        seconds: timeLeft.seconds()
                    };
                });

        this.subTimer = countDown.subscribe(value => {
            this.countdown = value;
            if (this.countdown.hours === 0 && this.countdown.minutes === 0 && this.countdown.seconds === 0){                
                this.subTimer.unsubscribe();
                Swal({
                    title: '¡El tiempo finalizó!',
                    text: 'El tiempo estimado para finalizar el examen finalizó.',
                    type: 'info',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Finalizar examen',
                }).then((resultAcept) => {                    
                    this.calificateTest();
                });                
            }
        });
    }
    
    ngAfterViewInit() {
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.element.nativeElement.id === 'course-step-content';
        });
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
        if (this.currentStep === this.questions.totalSteps - 1) {
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

    calificateTest(){
        const finalCalification = 0;
        let goodAnswer = 0;
        let badAnswer = 0;
        let noAnswer = 0;
        // tslint:disable-next-line:radix
        const pointXquestion = (20 / parseInt(this.test_num_ques));

        this.questionFormArray.value.forEach(element => {
            // tslint:disable-next-line:triple-equals
            if (element.ques_select != ''){
                if (element.ques_ok === element.ques_select) {
                    goodAnswer = goodAnswer + 1;
                } else {
                    badAnswer = badAnswer + 1;
                }
            }else{
                noAnswer = noAnswer + 1;
            }
        });

        const htmlText = '<h3>Felicidades, terminaste el examen.</h3>' +            
            '<h2>Calificación obtenida: ' + (pointXquestion * goodAnswer) + '</h2>' +
            '<ul style="float:left; margin-left:10%;">' +
            '<li style="text-align:left;">Correctas: ' + goodAnswer + '</li>' +
            '<li style="text-align:left;">Incorrectas: ' + badAnswer + '</li>' +
            '<li style="text-align:left;">Sin respuesta: ' + noAnswer + '</li></ul>';

        const dataFinalize = {
            test_id: this.test_id,
            test_result: (pointXquestion * goodAnswer),
            test_time_to_end: 1,
            test_ques_ok: goodAnswer,
            test_ques_bad: badAnswer,
            test_ques_blank: noAnswer,
            test_status: '2',
            test_fec_finaliza: this.testService.getDate()
        };

        console.log(dataFinalize);

        this.testService.postFinalizeTest(dataFinalize).subscribe(
            success => {
                // console.log(success);
            }, err => {
                // console.log(err);
            }
        );
        
        Swal({
            title: '¡Examen terminado!',
            html: htmlText,
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar',
        }).then((resultAcept) => {
            this.router.navigateByUrl('/exam');
        });
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
                this.calificateTest();
            }
        });
    }
}
