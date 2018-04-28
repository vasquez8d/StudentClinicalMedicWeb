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
    timer: any;

    questionFormArray: FormArray;
    questionForm: FormGroup;

    cityArray: FormArray;
    myGroup: FormGroup;

    @ViewChildren(FusePerfectScrollbarDirective) fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private testService: TestService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            

            this.cityArray = new FormArray([new FormControl(
                [
                    new FormControl({ value : 'a'}),
                    new FormControl({ value : 'b'}),
                    new FormControl({ value : 'c'})
                ]
            )]);
            this.myGroup = new FormGroup({
                cities: this.cityArray
            });

            this.questionFormArray = new FormArray(
                [
                ]
            );
            this.questionForm = new FormGroup(
                {
                    questions: this.questionFormArray
                }
            );

            if (params.test_num_ques && params.test_type_id && params.test_id && params.test_categ_slug) {
                const test_num_ques = Base64.decode(params.test_num_ques);
                const test_type_id = Base64.decode(params.test_type_id);
                const test_id = Base64.decode(params.test_id);                    
                const data = {
                    test_type_id: test_type_id,
                    test_num_ques: test_num_ques
                };
                this.testService.postTestQuestions(data).subscribe(
                    success => {
                        // tslint:disable-next-line:triple-equals
                        if (success.res_service == 'ok'){
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
                                        'questions' : this.questionFormArray
                                    }
                                );
                            });
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            }            
        });
    }

    getArrayQuestions(data){
        const dataForm = data.value;
        const arrayQuestions = [
            {
                text: dataForm.ques_res1,
                value: 1
            },
            {
                text: dataForm.ques_res2,
                value: 2
            },
            {
                text: dataForm.ques_res3,
                value: 3
            },
            {
                text: dataForm.ques_res4,
                value: 4
            },
            {
                text: dataForm.ques_res5,
                value: 5
            }
        ];
        return arrayQuestions;
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
